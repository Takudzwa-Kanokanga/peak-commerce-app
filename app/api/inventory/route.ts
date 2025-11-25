import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"

// Mock inventory data
const inventory = [
  { productId: 1, stock: 150, lastUpdated: new Date() },
  { productId: 2, stock: 80, lastUpdated: new Date() },
  { productId: 3, stock: 230, lastUpdated: new Date() },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get("productId")

    if (productId) {
      const item = inventory.find((i) => i.productId === Number.parseInt(productId))
      if (!item) {
        return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 })
      }
      return NextResponse.json({ success: true, data: item })
    }

    return NextResponse.json({ success: true, data: inventory })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch inventory" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { productId, quantity } = body

    const item = inventory.find((i) => i.productId === productId)
    if (!item) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 })
    }

    item.stock = quantity
    item.lastUpdated = new Date()

    return NextResponse.json({
      success: true,
      data: item,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update inventory" }, { status: 500 })
  }
}
