import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { sendOrderConfirmationEmail, sendAdminOrderNotification } from "@/lib/mailtrap"

// Mock database - replace with actual MongoDB
let orders: any[] = []

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    // Validate required fields
    if (!body.items || !body.shippingInfo || !body.total) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Create new order
    const order = {
      id: Math.random().toString(36).substr(2, 9),
      userId,
      items: body.items,
      shippingInfo: body.shippingInfo,
      total: body.total,
      status: "Pending",
      paymentMethod: body.paymentMethod || "card",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    orders.push(order)

    // Send order confirmation email to customer
    const customerEmailData = {
      orderId: order.id,
      customerEmail: body.shippingInfo.email,
      customerName: `${body.shippingInfo.firstName} ${body.shippingInfo.lastName}`,
      items: body.items,
      shippingInfo: body.shippingInfo,
      total: body.total,
      paymentMethod: body.paymentMethod || "card",
      createdAt: order.createdAt,
    }

    const emailSent = await sendOrderConfirmationEmail(customerEmailData)

    // Send admin notification email
    if (process.env.ADMIN_EMAIL) {
      await sendAdminOrderNotification(customerEmailData)
    }

    // Log email status for debugging
    if (!emailSent) {
      console.warn("Order confirmation email failed to send, but order was created:", order.id)
    }

    return NextResponse.json({
      success: true,
      data: order,
      emailSent,
    })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ success: false, error: "Failed to create order" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const userOrders = orders.filter((order) => order.userId === userId)

    return NextResponse.json({
      success: true,
      data: userOrders,
    })
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch orders" }, { status: 500 })
  }
}

