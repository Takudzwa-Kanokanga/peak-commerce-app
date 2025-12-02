import { Router } from "express";
import { checkout, handlePaymentCallback } from "../controllers/checkout";
import { authenticate } from "../middleware/auth";

const router = Router();

router.post("/", authenticate, checkout);
router.post("/webhook/payment-callback", handlePaymentCallback);

export default router;
