import { Request, Response } from "express";
import { prisma } from "../prisma";
import { addCartItemSchema } from "../validation/schemas";
import { AuthRequest } from "../middleware/auth";

const getOrCreateCart = async (userId: string) => {
  let cart = await prisma.cart.findUnique({ 
    where: { userId },
    include: { items: { include: { product: { include: { inventory: true } } } } }
  });
  if (!cart) {
    cart = await prisma.cart.create({ 
      data: { userId },
      include: { items: { include: { product: { include: { inventory: true } } } } }
    });
  }
  return cart;
};

export const addItem = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const parsed = addCartItemSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: "Invalid data", details: parsed.error });

    const { productId, quantity } = parsed.data;

    const product = await prisma.product.findUnique({ 
      where: { id: productId }, 
      include: { inventory: true }
    });
    if (!product) return res.status(404).json({ error: "Product not found" });
    if (product.inventory && product.inventory.quantity < quantity) {
      return res.status(400).json({ error: "Insufficient inventory" });
    }

    const cart = await getOrCreateCart(userId);

    const existing = await prisma.cartItem.findFirst({ 
      where: { cartId: cart.id, productId }
    });
    if (existing) {
      const updated = await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + quantity, unitPrice: product.price }
      });
      return res.json(updated);
    } else {
      const item = await prisma.cartItem.create({
        data: { cartId: cart.id, productId, quantity, unitPrice: product.price }
      });
      return res.status(201).json(item);
    }
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err });
  }
};

export const updateItem = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { itemId } = req.params;
    const { quantity } = req.body;
    
    if (typeof quantity !== "number" || quantity < 0) {
      return res.status(400).json({ error: "Invalid quantity" });
    }

    const item = await prisma.cartItem.findUnique({ 
      where: { id: itemId }, 
      include: { 
        cart: true,
        product: { include: { inventory: true }}
      }
    });
    if (!item) return res.status(404).json({ error: "Cart item not found" });
    if (item.cart.userId !== userId) return res.status(403).json({ error: "Forbidden" });
    
    if (item.product.inventory && item.product.inventory.quantity < quantity) {
      return res.status(400).json({ error: "Insufficient inventory" });
    }

    if (quantity === 0) {
      await prisma.cartItem.delete({ where: { id: itemId }});
      return res.status(204).send();
    } else {
      const updated = await prisma.cartItem.update({ 
        where: { id: itemId }, 
        data: { quantity }
      });
      return res.json(updated);
    }
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err });
  }
};

export const removeItem = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { itemId } = req.params;
    
    const item = await prisma.cartItem.findUnique({
      where: { id: itemId },
      include: { cart: true }
    });
    if (!item) return res.status(404).json({ error: "Cart item not found" });
    if (item.cart.userId !== userId) return res.status(403).json({ error: "Forbidden" });

    await prisma.cartItem.delete({ where: { id: itemId }});
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err });
  }
};

export const getCart = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const cart = await getOrCreateCart(userId);
    
    // Calculate total
    const total = cart.items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    
    res.json({ ...cart, total });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err });
  }
};

export const clearCart = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    await prisma.cartItem.deleteMany({
      where: { cart: { userId } }
    });

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err });
  }
};