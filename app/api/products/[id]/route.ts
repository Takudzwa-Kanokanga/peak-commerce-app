import { type NextRequest, NextResponse } from "next/server"

// Mock database
const products: Record<string, any> = {
  "1": {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 79.99,
    category: "Audio",
    description: "Premium wireless headphones with active noise cancellation and 30-hour battery life.",
    image: "/wireless-bluetooth-headphones.jpg",
    stock: 150,
    features: ["Active Noise Cancellation (ANC)", "30-hour battery life", "Bluetooth 5.0", "Foldable design"],
  },
  "2": {
    id: 2,
    name: "Smartwatch with Heart Monitor",
    price: 199.99,
    category: "Wearables",
    description: "Advanced smartwatch with health monitoring features and fitness tracking.",
    image: "/smartwatch-heart-monitor.jpg",
    stock: 80,
    features: ["Heart rate monitor", "GPS tracking", "Water resistant (50m)", "AMOLED display"],
  },
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const product = products[params.id]

    if (!product) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: product,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch product" }, { status: 500 })
  }
}
