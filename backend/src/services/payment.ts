import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_fake_key", {
  apiVersion: "2024-04-10" as any,
});

export const processMockPayment = async (userId: string, amount: number) => {
  await new Promise((r) => setTimeout(r, 300));
  return { success: true, transactionId: `MOCK_TX_${Date.now()}` };
};

export const createStripePaymentIntent = async (
  userId: string,
  amount: number,
  orderId: string,
  email: string
) => {
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
  } catch (err: any) {
    console.error("Stripe error:", err);
    return {
      success: false,
      transactionId: `STRIPE_ERROR_${Date.now()}`,
      error: err.message,
    };
  }
};

export const confirmStripePayment = async (paymentIntentId: string) => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    return {
      status: paymentIntent.status,
      amount: paymentIntent.amount / 100, // Convert from cents
      clientSecret: paymentIntent.client_secret,
    };
  } catch (err: any) {
    console.error("Stripe confirmation error:", err);
    throw err;
  }
};

export const refundPayment = async (paymentIntentId: string, amount?: number) => {
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
  } catch (err: any) {
    console.error("Stripe refund error:", err);
    return {
      success: false,
      error: err.message,
    };
  }
};