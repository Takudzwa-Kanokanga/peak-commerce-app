import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"

// Mock database - reference to orders
let orders: any[] = []

// In a real app, this would be fetched from a shared database
const getOrders = () => orders
const setOrders = (newOrders: any[]) => { orders = newOrders }

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const order = orders.find(o => o.id === params.id && o.userId === userId)

    if (!order) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: order,
    })
  } catch (error) {
    console.error("Error fetching order:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch order" },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const orderIndex = orders.findIndex(o => o.id === params.id && o.userId === userId)

    if (orderIndex === -1) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      )
    }

    // Update order fields
    if (body.status && ["Pending", "Processing", "Fulfilled"].includes(body.status)) {
      orders[orderIndex].status = body.status
    }

    if (body.shippingInfo) {
      orders[orderIndex].shippingInfo = {
        ...orders[orderIndex].shippingInfo,
        ...body.shippingInfo
      }
    }

    orders[orderIndex].updatedAt = new Date().toISOString()

    return NextResponse.json({
      success: true,
      data: orders[orderIndex],
    })
  } catch (error) {
    console.error("Error updating order:", error)
    return NextResponse.json(
      { success: false, error: "Failed to update order" },
      { status: 500 }
    )
  }
}
