import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"

// Mock database - replace with actual MongoDB
const orders: any[] = []

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
      status: "pending",
      createdAt: new Date(),
    }

    orders.push(order)

    return NextResponse.json({
      success: true,
      data: order,
    })
  } catch (error) {
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
    return NextResponse.json({ success: false, error: "Failed to fetch orders" }, { status: 500 })
  }
}
