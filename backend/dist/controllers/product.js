"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProduct = exports.listProducts = void 0;
const prisma_1 = require("../prisma");
const redis_1 = require("../redis");
const schemas_1 = require("../validation/schemas");
// Safe Redis helpers
async function safeGet(key) {
    try {
        return await redis_1.redis.get(key);
    }
    catch {
        return null;
    }
}
async function safeSet(key, value, ttl) {
    try {
        await redis_1.redis.set(key, JSON.stringify(value), "EX", ttl);
    }
    catch { }
}
async function safeDeletePattern(pattern) {
    try {
        const keys = await redis_1.redis.keys(pattern);
        if (keys.length > 0)
            await redis_1.redis.del(keys);
    }
    catch { }
}
// GET /products
const listProducts = async (req, res) => {
    try {
        const limit = Math.min(Number(req.query.limit) || 20, 100);
        const page = Math.max(Number(req.query.page) || 1, 1);
        const cacheKey = `products:page:${page}:limit:${limit}`;
        const cached = await safeGet(cacheKey);
        if (cached)
            return res.json(JSON.parse(cached));
        const products = await prisma_1.prisma.product.findMany({
            take: limit,
            skip: (page - 1) * limit,
            include: { inventory: true },
            orderBy: { createdAt: "desc" },
        });
        await safeSet(cacheKey, products, 30);
        res.json(products);
    }
    catch (err) {
        res.status(500).json({ error: "Server error", details: err });
    }
};
exports.listProducts = listProducts;
// GET /products/:id
const getProduct = async (req, res) => {
    try {
        const id = String(req.params.id);
        const cacheKey = `product:${id}`;
        const cached = await safeGet(cacheKey);
        if (cached)
            return res.json(JSON.parse(cached));
        const product = await prisma_1.prisma.product.findUnique({
            where: { id },
            include: { inventory: true },
        });
        if (!product)
            return res.status(404).json({ error: "Product not found" });
        await safeSet(cacheKey, product, 60);
        res.json(product);
    }
    catch (err) {
        res.status(500).json({ error: "Server error", details: err });
    }
};
exports.getProduct = getProduct;
// POST /products (with optional image upload)
const createProduct = async (req, res) => {
    try {
        const parsed = schemas_1.productCreateSchema.safeParse(req.body);
        if (!parsed.success)
            return res.status(400).json({ error: "Invalid data", details: parsed.error });
        const data = parsed.data;
        // Get image URL if file was uploaded
        const imageUrl = req.file
            ? `/uploads/${req.file.filename}`
            : data.imageUrl;
        const product = await prisma_1.prisma.product.create({
            data: {
                name: data.name,
                description: data.description ?? null,
                price: data.price,
                sku: data.sku ?? null,
                imageUrl: imageUrl ?? null,
            },
        });
        if (data.inventory) {
            await prisma_1.prisma.inventory.create({
                data: { productId: product.id, quantity: data.inventory.quantity },
            });
        }
        await safeDeletePattern("products:*");
        res.status(201).json(product);
    }
    catch (err) {
        res.status(500).json({ error: "Server error", details: err });
    }
};
exports.createProduct = createProduct;
// PUT /products/:id (with optional image update)
const updateProduct = async (req, res) => {
    try {
        const id = String(req.params.id);
        const updateData = req.body;
        // Add uploaded image URL if provided
        if (req.file) {
            updateData.imageUrl = `/uploads/${req.file.filename}`;
        }
        const updated = await prisma_1.prisma.product.update({
            where: { id },
            data: updateData,
        });
        await safeDeletePattern("products:*");
        await safeDeletePattern(`product:${id}`);
        res.json(updated);
    }
    catch (err) {
        res.status(500).json({ error: "Update failed", details: err });
    }
};
exports.updateProduct = updateProduct;
// DELETE /products/:id
const deleteProduct = async (req, res) => {
    try {
        const id = String(req.params.id);
        await prisma_1.prisma.product.delete({
            where: { id },
        });
        await safeDeletePattern("products:*");
        await safeDeletePattern(`product:${id}`);
        res.status(204).send();
    }
    catch (err) {
        res.status(500).json({ error: "Delete failed", details: err });
    }
};
exports.deleteProduct = deleteProduct;
