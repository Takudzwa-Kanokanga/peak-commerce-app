import { Request, Response } from "express";
import { prisma } from "../prisma";
import { checkoutSchema } from "../validation/schemas";
import { processMockPayment, createStripePaymentIntent } from "../services/payment";
import { sendOrderConfirmation } from "../services/email";
import { AuthRequest } from "../middleware/auth";
import { Prisma } from '@prisma/client';

export const checkout = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const parsed = checkoutSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "Invalid data", details: parsed.error });

    const body = parsed.data;

    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: { include: { product: { include: { inventory: true } } } } }
    });

    if (!cart || cart.items.length === 0) return res.status(400).json({ error: "Cart is empty" });

    const total = cart.items.reduce((s, it) => s + it.unitPrice * it.quantity, 0);

    try {
      const result = await prisma.$transaction(async (prismaTx) => {
        const productIds = cart.items.map(it => it.productId);
        await prismaTx.$queryRaw`SELECT id, "productId", quantity FROM "Inventory" WHERE "productId" IN (${Prisma.join(productIds)}) FOR UPDATE`;

        const inventories = await prismaTx.inventory.findMany({ where: { productId: { in: productIds } } });
        const invMap = new Map(inventories.map(i => [i.productId, i]));

        for (const item of cart.items) {
          const inv = invMap.get(item.productId);
          const stock = inv ? inv.quantity : 0;
          if (stock < item.quantity) throw new Error(`Insufficient stock for product ${item.productId}`);
        }

        // Deduct inventory
        for (const item of cart.items) {
          await prismaTx.inventory.update({
            where: { productId: item.productId },
            data: { quantity: { decrement: item.quantity } }
          });
        }

        // Create order
        const order = await prismaTx.order.create({
          data: {
            userId,
            total,
            currency: "USD",
            status: "PENDING",
            shippingName: body.shippingName,
            shippingEmail: body.shippingEmail,
            shippingAddress: body.shippingAddress,
            shippingMobile: body.shippingMobile
          }
        });

        // Create order items
        for (const item of cart.items) {
          await prismaTx.orderItem.create({
            data: {
              orderId: order.id,
              productId: item.productId,
              quantity: item.quantity,
              unitPrice: item.unitPrice
            }
          });
        }

        // Clear cart
        await prismaTx.cartItem.deleteMany({ where: { cartId: cart.id } });

        return order;
      });

      // Process payment
      let paymentResult: any;
      if (body.paymentMethod === "stripe") {
        paymentResult = await createStripePaymentIntent(userId, total, result.id, body.shippingEmail);
      } else {
        paymentResult = await processMockPayment(userId, total);
      }

      // Create transaction record
      const transaction = await prisma.transaction.create({
        data: {
          orderId: result.id,
          amount: total,
          currency: "USD",
          provider: body.paymentMethod || "mock",
          stripeId: paymentResult.stripeId || undefined,
          status: paymentResult.success ? "completed" : "pending",
          metadata: JSON.stringify(paymentResult)
        }
      });

      // Update order with transaction
      const finalOrder = await prisma.order.update({
        where: { id: result.id },
        data: {
          paymentId: paymentResult.transactionId,
          transactionId: transaction.id,
          status: paymentResult.success ? "PROCESSING" : "PENDING"
        },
        include: {
          items: { include: { product: true } },
          transaction: true
        }
      });

      // Send confirmation email
      sendOrderConfirmation(body.shippingEmail, finalOrder.id, finalOrder).catch(err =>
        console.error("Email error:", err)
      );

      res.status(201).json({
        order: finalOrder,
        paymentIntent: paymentResult.clientSecret || undefined
      });
    } catch (transactionErr: any) {
      console.error("Transaction error:", transactionErr);
      return res.status(400).json({ error: transactionErr.message || "Checkout failed" });
    }
  } catch (err) {
    console.error("Checkout error:", err);
    res.status(500).json({ error: "Server error", details: err });
  }
};

export const handlePaymentCallback = async (req: Request, res: Response) => {
  try {
    const { orderId, status, transactionId } = req.body;

    if (!orderId || !status) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const transaction = await prisma.transaction.findFirst({
      where: { orderId }
    });

    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    // Update transaction status
    await prisma.transaction.update({
      where: { id: transaction.id },
      data: {
        status: status,
        stripeId: transactionId || transaction.stripeId
      }
    });

    // Update order status based on payment result
    const orderStatus = status === "completed" ? "PROCESSING" : "FAILED";
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: { status: orderStatus },
      include: { items: { include: { product: true } }, transaction: true }
    });

    res.json({ success: true, order: updatedOrder });
  } catch (err) {
    console.error("Payment callback error:", err);
    res.status(500).json({ error: "Server error", details: err });
  }
};