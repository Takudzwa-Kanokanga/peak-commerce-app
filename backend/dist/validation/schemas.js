"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginSchema = exports.userRegisterSchema = exports.orderStatusUpdateSchema = exports.checkoutSchema = exports.updateCartItemSchema = exports.addCartItemSchema = exports.productCreateSchema = void 0;
const zod_1 = require("zod");
exports.productCreateSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Product name is required"),
    description: zod_1.z.string().optional(),
    price: zod_1.z.number().nonnegative("Price must be non-negative"),
    sku: zod_1.z.string().optional(),
    imageUrl: zod_1.z.string().optional(),
    inventory: zod_1.z.object({
        quantity: zod_1.z.number().int().nonnegative("Quantity must be non-negative")
    }).optional()
});
exports.addCartItemSchema = zod_1.z.object({
    productId: zod_1.z.string().min(1, "Product ID is required"),
    quantity: zod_1.z.number().int().positive("Quantity must be positive")
});
exports.updateCartItemSchema = zod_1.z.object({
    quantity: zod_1.z.number().int().nonnegative("Quantity must be non-negative")
});
exports.checkoutSchema = zod_1.z.object({
    shippingName: zod_1.z.string().min(1, "Shipping name is required"),
    shippingEmail: zod_1.z.string().email("Valid email is required"),
    shippingAddress: zod_1.z.string().min(5, "Address must be at least 5 characters"),
    shippingMobile: zod_1.z.string().min(5, "Phone number must be at least 5 characters"),
    paymentMethod: zod_1.z.enum(["mock", "stripe"]).default("mock")
});
exports.orderStatusUpdateSchema = zod_1.z.object({
    status: zod_1.z.enum(["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED", "FAILED", "FULFILLED"])
});
exports.userRegisterSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    name: zod_1.z.string().optional()
});
exports.userLoginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string()
});
