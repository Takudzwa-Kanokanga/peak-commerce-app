"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePaymentCallback = exports.checkout = void 0;
const prisma_1 = require("../prisma");
const schemas_1 = require("../validation/schemas");
const payment_1 = require("../services/payment");
const email_1 = require("../services/email");
const client_1 = require("@prisma/client");
const checkout = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId)
            return res.status(401).json({ error: "Unauthorized" });
        const parsed = schemas_1.checkoutSchema.safeParse(req.body);
        if (!parsed.success)
            return res.status(400).json({ error: "Invalid data", details: parsed.error });
        const body = parsed.data;
        const cart = await prisma_1.prisma.cart.findUnique({
            where: { userId },
            include: { items: { include: { product: { include: { inventory: true } } } } }
        });
        if (!cart || cart.items.length === 0)
            return res.status(400).json({ error: "Cart is empty" });
        const total = cart.items.reduce((s, it) => s + it.unitPrice * it.quantity, 0);
        try {
            const result = await prisma_1.prisma.$transaction(async (prismaTx) => {
                const productIds = cart.items.map(it => it.productId);
                await prismaTx.$queryRaw `SELECT id, "productId", quantity FROM "Inventory" WHERE "productId" IN (${client_1.Prisma.join(productIds)}) FOR UPDATE`;
                const inventories = await prismaTx.inventory.findMany({ where: { productId: { in: productIds } } });
                const invMap = new Map(inventories.map(i => [i.productId, i]));
                for (const item of cart.items) {
                    const inv = invMap.get(item.productId);
                    const stock = inv ? inv.quantity : 0;
                    if (stock < item.quantity)
                        throw new Error(`Insufficient stock for product ${item.productId}`);
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
            let paymentResult;
            if (body.paymentMethod === "stripe") {
                paymentResult = await (0, payment_1.createStripePaymentIntent)(userId, total, result.id, body.shippingEmail);
            }
            else {
                paymentResult = await (0, payment_1.processMockPayment)(userId, total);
            }
            // Create transaction record
            const transaction = await prisma_1.prisma.transaction.create({
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
            const finalOrder = await prisma_1.prisma.order.update({
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
            (0, email_1.sendOrderConfirmation)(body.shippingEmail, finalOrder.id, finalOrder).catch(err => console.error("Email error:", err));
            res.status(201).json({
                order: finalOrder,
                paymentIntent: paymentResult.clientSecret || undefined
            });
        }
        catch (transactionErr) {
            console.error("Transaction error:", transactionErr);
            return res.status(400).json({ error: transactionErr.message || "Checkout failed" });
        }
    }
    catch (err) {
        console.error("Checkout error:", err);
        res.status(500).json({ error: "Server error", details: err });
    }
};
exports.checkout = checkout;
const handlePaymentCallback = async (req, res) => {
    try {
        const { orderId, status, transactionId } = req.body;
        if (!orderId || !status) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const transaction = await prisma_1.prisma.transaction.findFirst({
            where: { orderId }
        });
        if (!transaction) {
            return res.status(404).json({ error: "Transaction not found" });
        }
        // Update transaction status
        await prisma_1.prisma.transaction.update({
            where: { id: transaction.id },
            data: {
                status: status,
                stripeId: transactionId || transaction.stripeId
            }
        });
        // Update order status based on payment result
        const orderStatus = status === "completed" ? "PROCESSING" : "FAILED";
        const updatedOrder = await prisma_1.prisma.order.update({
            where: { id: orderId },
            data: { status: orderStatus },
            include: { items: { include: { product: true } }, transaction: true }
        });
        res.json({ success: true, order: updatedOrder });
    }
    catch (err) {
        console.error("Payment callback error:", err);
        res.status(500).json({ error: "Server error", details: err });
    }
};
exports.handlePaymentCallback = handlePaymentCallback;
