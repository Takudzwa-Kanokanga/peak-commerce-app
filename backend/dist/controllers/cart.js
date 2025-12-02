"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearCart = exports.getCart = exports.removeItem = exports.updateItem = exports.addItem = void 0;
const prisma_1 = require("../prisma");
const schemas_1 = require("../validation/schemas");
const getOrCreateCart = async (userId) => {
    let cart = await prisma_1.prisma.cart.findUnique({
        where: { userId },
        include: { items: { include: { product: { include: { inventory: true } } } } }
    });
    if (!cart) {
        cart = await prisma_1.prisma.cart.create({
            data: { userId },
            include: { items: { include: { product: { include: { inventory: true } } } } }
        });
    }
    return cart;
};
const addItem = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId)
            return res.status(401).json({ error: "Unauthorized" });
        const parsed = schemas_1.addCartItemSchema.safeParse(req.body);
        if (!parsed.success)
            return res.status(400).json({ error: "Invalid data", details: parsed.error });
        const { productId, quantity } = parsed.data;
        const product = await prisma_1.prisma.product.findUnique({
            where: { id: productId },
            include: { inventory: true }
        });
        if (!product)
            return res.status(404).json({ error: "Product not found" });
        if (product.inventory && product.inventory.quantity < quantity) {
            return res.status(400).json({ error: "Insufficient inventory" });
        }
        const cart = await getOrCreateCart(userId);
        const existing = await prisma_1.prisma.cartItem.findFirst({
            where: { cartId: cart.id, productId }
        });
        if (existing) {
            const updated = await prisma_1.prisma.cartItem.update({
                where: { id: existing.id },
                data: { quantity: existing.quantity + quantity, unitPrice: product.price }
            });
            return res.json(updated);
        }
        else {
            const item = await prisma_1.prisma.cartItem.create({
                data: { cartId: cart.id, productId, quantity, unitPrice: product.price }
            });
            return res.status(201).json(item);
        }
    }
    catch (err) {
        res.status(500).json({ error: "Server error", details: err });
    }
};
exports.addItem = addItem;
const updateItem = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId)
            return res.status(401).json({ error: "Unauthorized" });
        const { itemId } = req.params;
        const { quantity } = req.body;
        if (typeof quantity !== "number" || quantity < 0) {
            return res.status(400).json({ error: "Invalid quantity" });
        }
        const item = await prisma_1.prisma.cartItem.findUnique({
            where: { id: itemId },
            include: {
                cart: true,
                product: { include: { inventory: true } }
            }
        });
        if (!item)
            return res.status(404).json({ error: "Cart item not found" });
        if (item.cart.userId !== userId)
            return res.status(403).json({ error: "Forbidden" });
        if (item.product.inventory && item.product.inventory.quantity < quantity) {
            return res.status(400).json({ error: "Insufficient inventory" });
        }
        if (quantity === 0) {
            await prisma_1.prisma.cartItem.delete({ where: { id: itemId } });
            return res.status(204).send();
        }
        else {
            const updated = await prisma_1.prisma.cartItem.update({
                where: { id: itemId },
                data: { quantity }
            });
            return res.json(updated);
        }
    }
    catch (err) {
        res.status(500).json({ error: "Server error", details: err });
    }
};
exports.updateItem = updateItem;
const removeItem = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId)
            return res.status(401).json({ error: "Unauthorized" });
        const { itemId } = req.params;
        const item = await prisma_1.prisma.cartItem.findUnique({
            where: { id: itemId },
            include: { cart: true }
        });
        if (!item)
            return res.status(404).json({ error: "Cart item not found" });
        if (item.cart.userId !== userId)
            return res.status(403).json({ error: "Forbidden" });
        await prisma_1.prisma.cartItem.delete({ where: { id: itemId } });
        res.status(204).send();
    }
    catch (err) {
        res.status(500).json({ error: "Server error", details: err });
    }
};
exports.removeItem = removeItem;
const getCart = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId)
            return res.status(401).json({ error: "Unauthorized" });
        const cart = await getOrCreateCart(userId);
        // Calculate total
        const total = cart.items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
        res.json({ ...cart, total });
    }
    catch (err) {
        res.status(500).json({ error: "Server error", details: err });
    }
};
exports.getCart = getCart;
const clearCart = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId)
            return res.status(401).json({ error: "Unauthorized" });
        await prisma_1.prisma.cartItem.deleteMany({
            where: { cart: { userId } }
        });
        res.status(204).send();
    }
    catch (err) {
        res.status(500).json({ error: "Server error", details: err });
    }
};
exports.clearCart = clearCart;
