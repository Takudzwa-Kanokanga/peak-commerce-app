// app/api/email/route.ts
/**
 * Production email endpoint
 * POST /api/email - Send order-related emails (customer + admin)
 * Requires Clerk auth. Expects an order payload in the request body.
 */

import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import {
  sendOrderConfirmationEmail,
  sendAdminOrderNotification,
  type OrderConfirmationEmailData,
} from "@/lib/mailtrap"

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    // Expect either `order` wrapper or direct order object
    const order: OrderConfirmationEmailData = body.order || body

    if (!order || !order.orderId || !order.customerEmail || !order.items) {
      return NextResponse.json({ success: false, error: "Invalid order payload" }, { status: 400 })
    }

    // Send customer confirmation
    const customerSent = await sendOrderConfirmationEmail(order)

    // Attempt admin notification as well (best-effort)
    let adminSent = false
    try {
      adminSent = await sendAdminOrderNotification(order)
    } catch (err) {
      console.error("Admin notification failed:", err)
    }

    return NextResponse.json({
      success: customerSent,
      customerSent,
      adminSent,
      orderId: order.orderId,
    })
  } catch (error) {
    console.error("Error in production email endpoint:", error)
    return NextResponse.json({ success: false, error: "Failed to send emails" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ success: true, message: "Email API available" })
}
