import { Router } from "express";
import {
  listUserOrders,
  listAllOrders,
  getOrder,
  updateOrderStatus,
  fulfillOrder,
  cancelOrder
} from "../controllers/orders";
import { authenticate, requireAdmin } from "../middleware/auth";

const router = Router();

// User routes - get their own orders
router.get("/", authenticate, listUserOrders);
router.get("/:id", authenticate, getOrder);
router.post("/:id/cancel", authenticate, cancelOrder);

// Admin routes - manage all orders
router.get("/admin/all", authenticate, requireAdmin, listAllOrders);
router.patch("/:id/status", authenticate, requireAdmin, updateOrderStatus);
router.post("/:id/fulfill", authenticate, requireAdmin, fulfillOrder);

export default router;
