"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const checkout_1 = require("../controllers/checkout");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post("/", auth_1.authenticate, checkout_1.checkout);
router.post("/webhook/payment-callback", checkout_1.handlePaymentCallback);
exports.default = router;
