import { Request, Response } from "express";
import { prisma } from "../prisma";
import { redis } from "../redis";
import { productCreateSchema } from "../validation/schemas";

// Safe Redis helpers
async function safeGet(key: string) {
  try {
    return await redis.get(key);
  } catch {
    return null;
  }
}

async function safeSet(key: string, value: any, ttl: number) {
  try {
    await redis.set(key, JSON.stringify(value), "EX", ttl);
  } catch {}
}

async function safeDeletePattern(pattern: string) {
  try {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) await redis.del(keys);
  } catch {}
}

// GET /products
export const listProducts = async (req: Request, res: Response) => {
  try {
    const limit = Math.min(Number(req.query.limit) || 20, 100);
    const page = Math.max(Number(req.query.page) || 1, 1);
    const cacheKey = `products:page:${page}:limit:${limit}`;

    const cached = await safeGet(cacheKey);
    if (cached) return res.json(JSON.parse(cached));

    const products = await prisma.product.findMany({
      take: limit,
      skip: (page - 1) * limit,
      include: { inventory: true },
      orderBy: { createdAt: "desc" },
    });

    await safeSet(cacheKey, products, 30);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err });
  }
};

// GET /products/:id
export const getProduct = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const cacheKey = `product:${id}`;

    const cached = await safeGet(cacheKey);
    if (cached) return res.json(JSON.parse(cached));

    const product = await prisma.product.findUnique({
      where: { id },
      include: { inventory: true },
    });

    if (!product) return res.status(404).json({ error: "Product not found" });

    await safeSet(cacheKey, product, 60);
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err });
  }
};

// POST /products (with optional image upload)
export const createProduct = async (req: Request, res: Response) => {
  try {
    const parsed = productCreateSchema.safeParse(req.body);
    if (!parsed.success)
      return res.status(400).json({ error: "Invalid data", details: parsed.error });

    const data = parsed.data;
    
    // Get image URL if file was uploaded
    const imageUrl = (req as any).file 
      ? `/uploads/${(req as any).file.filename}` 
      : data.imageUrl;

    const product = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description ?? null,
        price: data.price,
        sku: data.sku ?? null,
        imageUrl: imageUrl ?? null,
      },
    });

    if (data.inventory) {
      await prisma.inventory.create({
        data: { productId: product.id, quantity: data.inventory.quantity },
      });
    }

    await safeDeletePattern("products:*");
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err });
  }
};

// PUT /products/:id (with optional image update)
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);

    const updateData: any = req.body;
    
    // Add uploaded image URL if provided
    if ((req as any).file) {
      updateData.imageUrl = `/uploads/${(req as any).file.filename}`;
    }

    const updated = await prisma.product.update({
      where: { id },
      data: updateData,
    });

    await safeDeletePattern("products:*");
    await safeDeletePattern(`product:${id}`);

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Update failed", details: err });
  }
};

// DELETE /products/:id
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);

    await prisma.product.delete({
      where: { id },
    });

    await safeDeletePattern("products:*");
    await safeDeletePattern(`product:${id}`);

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Delete failed", details: err });
  }
};
