import { Request, Response } from "express";
import { prisma } from "../prisma";
import { AuthRequest } from "../middleware/auth";

export const listUserOrders = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: { product: true }
        },
        transaction: true
      },
      orderBy: { createdAt: "desc" }
    });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err });
  }
};

export const listAllOrders = async (req: AuthRequest, res: Response) => {
  try {
    // Only admins can see all orders
    if (req.user?.role !== "ADMIN") {
      return res.status(403).json({ error: "Forbidden" });
    }

    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: { product: true }
        },
        user: true,
        transaction: true
      },
      orderBy: { createdAt: "desc" }
    });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err });
  }
};

export const getOrder = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const orderId = String(req.params.id);

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: { product: true }
        },
        transaction: true
      }
    });

    if (!order) return res.status(404).json({ error: "Order not found" });

    // Users can only see their own orders
    if (order.userId !== userId && req.user?.role !== "ADMIN") {
      return res.status(403).json({ error: "Forbidden" });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err });
  }
};

export const updateOrderStatus = async (req: AuthRequest, res: Response) => {
  try {
    // Only admins can update order status
    if (req.user?.role !== "ADMIN") {
      return res.status(403).json({ error: "Forbidden" });
    }

    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: "Status is required" });
    }

    const validStatuses = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED", "FAILED", "FULFILLED"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const updated = await prisma.order.update({
      where: { id },
      data: { status },
      include: {
        items: {
          include: { product: true }
        },
        transaction: true
      }
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Update failed", details: err });
  }
};

export const fulfillOrder = async (req: AuthRequest, res: Response) => {
  try {
    // Only admins can fulfill orders
    if (req.user?.role !== "ADMIN") {
      return res.status(403).json({ error: "Forbidden" });
    }

    const { id } = req.params;

    const order = await prisma.order.findUnique({
      where: { id },
      include: { items: true, transaction: true }
    });

    if (!order) return res.status(404).json({ error: "Order not found" });

    // Can only fulfill orders that are processed and paid
    if (order.status !== "PROCESSING") {
      return res.status(400).json({ error: "Order must be in PROCESSING status" });
    }

    const updated = await prisma.order.update({
      where: { id },
      data: { status: "FULFILLED" },
      include: {
        items: {
          include: { product: true }
        },
        transaction: true
      }
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err });
  }
};

export const cancelOrder = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { id } = req.params;

    const order = await prisma.order.findUnique({
      where: { id },
      include: { items: true }
    });

    if (!order) return res.status(404).json({ error: "Order not found" });

    // Users can only cancel their own pending orders
    if (order.userId !== userId && req.user?.role !== "ADMIN") {
      return res.status(403).json({ error: "Forbidden" });
    }

    if (order.status !== "PENDING") {
      return res.status(400).json({ error: "Can only cancel pending orders" });
    }

    // Restore inventory
    for (const item of order.items) {
      await prisma.inventory.update({
        where: { productId: item.productId },
        data: { quantity: { increment: item.quantity } }
      });
    }

    const updated = await prisma.order.update({
      where: { id },
      data: { status: "CANCELLED" },
      include: {
        items: {
          include: { product: true }
        }
      }
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err });
  }
};