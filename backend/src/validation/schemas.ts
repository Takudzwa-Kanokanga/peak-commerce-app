import { z } from "zod";

export const productCreateSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().optional(),
  price: z.number().nonnegative("Price must be non-negative"),
  sku: z.string().optional(),
  imageUrl: z.string().optional(),
  inventory: z.object({
    quantity: z.number().int().nonnegative("Quantity must be non-negative")
  }).optional()
});

export const addCartItemSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  quantity: z.number().int().positive("Quantity must be positive")
});

export const updateCartItemSchema = z.object({
  quantity: z.number().int().nonnegative("Quantity must be non-negative")
});

export const checkoutSchema = z.object({
  shippingName: z.string().min(1, "Shipping name is required"),
  shippingEmail: z.string().email("Valid email is required"),
  shippingAddress: z.string().min(5, "Address must be at least 5 characters"),
  shippingMobile: z.string().min(5, "Phone number must be at least 5 characters"),
  paymentMethod: z.enum(["mock", "stripe"]).default("mock")
});

export const orderStatusUpdateSchema = z.object({
  status: z.enum(["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED", "FAILED", "FULFILLED"])
});

export const userRegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional()
});

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});