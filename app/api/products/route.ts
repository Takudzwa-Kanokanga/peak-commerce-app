import { type NextRequest, NextResponse } from "next/server"

// Mock database - replace with actual MongoDB connection
const products = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 79.99,
    category: "Audio",
    description: "Premium wireless headphones with active noise cancellation",
    image: "/wireless-bluetooth-headphones.jpg",
    stock: 150,
  },
  {
    id: 2,
    name: "Smartwatch with Heart Monitor",
    price: 199.99,
    category: "Wearables",
    description: "Advanced smartwatch with health monitoring",
    image: "/smartwatch-heart-monitor.jpg",
    stock: 80,
  },
  {
    id: 3,
    name: "Portable Bluetooth Speaker",
    price: 89.99,
    category: "Audio",
    description: "Compact yet powerful Bluetooth speaker",
    image: "/portable-bluetooth-speaker.jpg",
    stock: 230,
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")

    let filtered = products

    if (category) {
      filtered = products.filter((p) => p.category === category)
    }

    return NextResponse.json({
      success: true,
      data: filtered,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch products" }, { status: 500 })
  }
}
