"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orders_1 = require("../controllers/orders");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// User routes - get their own orders
router.get("/", auth_1.authenticate, orders_1.listUserOrders);
router.get("/:id", auth_1.authenticate, orders_1.getOrder);
router.post("/:id/cancel", auth_1.authenticate, orders_1.cancelOrder);
// Admin routes - manage all orders
router.get("/admin/all", auth_1.authenticate, auth_1.requireAdmin, orders_1.listAllOrders);
router.patch("/:id/status", auth_1.authenticate, auth_1.requireAdmin, orders_1.updateOrderStatus);
router.post("/:id/fulfill", auth_1.authenticate, auth_1.requireAdmin, orders_1.fulfillOrder);
exports.default = router;
