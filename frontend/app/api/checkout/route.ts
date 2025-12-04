import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-06-20" as any,
})

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { items, total, shippingInfo, paymentMethod } = body

    if (!items || !total || !shippingInfo) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      )
    }

    // If payment method is not Stripe, just return success (for bank transfer, etc)
    if (paymentMethod !== "stripe") {
      return NextResponse.json({
        success: true,
        data: {
          status: "pending",
          message: "Order pending payment. Bank transfer details will be sent via email.",
        },
      })
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      line_items: items.map((item: any) => ({
        price_data: {
          currency: "usd", // In production, convert ZWL to USD or use custom currency
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100), // Convert to cents
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/cancel`,
      customer_email: shippingInfo.email,
      shipping_address_collection: {
        allowed_countries: ["ZW", "US", "GB", "CA", "AU"],
      },
      metadata: {
        userId,
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        sessionId: session.id,
        url: session.url,
      },
    })
  } catch (error) {
    console.error("Checkout error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to create checkout session" },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get("session_id")

    if (!sessionId) {
      return NextResponse.json(
        { success: false, error: "Session ID required" },
        { status: 400 }
      )
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId)

    return NextResponse.json({
      success: true,
      data: {
        status: session.payment_status,
        paid: session.payment_status === "paid",
        customer_email: session.customer_email,
      },
    })
  } catch (error) {
    console.error("Error retrieving session:", error)
    return NextResponse.json(
      { success: false, error: "Failed to retrieve session" },
      { status: 500 }
    )
  }
}
