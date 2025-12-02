"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refundPayment = exports.confirmStripePayment = exports.createStripePaymentIntent = exports.processMockPayment = void 0;
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY || "sk_test_fake_key", {
    apiVersion: "2024-04-10",
});
const processMockPayment = async (userId, amount) => {
    await new Promise((r) => setTimeout(r, 300));
    return { success: true, transactionId: `MOCK_TX_${Date.now()}` };
};
exports.processMockPayment = processMockPayment;
const createStripePaymentIntent = async (userId, amount, orderId, email) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Convert to cents
            currency: "usd",
            metadata: {
                userId,
                orderId,
                email,
            },
            description: `Order ${orderId} for ${email}`,
        });
        return {
            success: true,
            transactionId: paymentIntent.id,
            clientSecret: paymentIntent.client_secret,
            stripeId: paymentIntent.id,
        };
    }
    catch (err) {
        console.error("Stripe error:", err);
        return {
            success: false,
            transactionId: `STRIPE_ERROR_${Date.now()}`,
            error: err.message,
        };
    }
};
exports.createStripePaymentIntent = createStripePaymentIntent;
const confirmStripePayment = async (paymentIntentId) => {
    try {
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
        return {
            status: paymentIntent.status,
            amount: paymentIntent.amount / 100, // Convert from cents
            clientSecret: paymentIntent.client_secret,
        };
    }
    catch (err) {
        console.error("Stripe confirmation error:", err);
        throw err;
    }
};
exports.confirmStripePayment = confirmStripePayment;
const refundPayment = async (paymentIntentId, amount) => {
    try {
        const refund = await stripe.refunds.create({
            payment_intent: paymentIntentId,
            amount: amount ? Math.round(amount * 100) : undefined,
        });
        return {
            success: true,
            refundId: refund.id,
            amount: refund.amount / 100,
        };
    }
    catch (err) {
        console.error("Stripe refund error:", err);
        return {
            success: false,
            error: err.message,
        };
    }
};
exports.refundPayment = refundPayment;
