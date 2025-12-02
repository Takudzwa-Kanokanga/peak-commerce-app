import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"

// Mock database
let products: Record<string, any> = {
  "1": {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 79.99,
    category: "Audio",
    description: "Premium wireless headphones with active noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
    stock: 150,
    features: ["Active Noise Cancellation (ANC)", "30-hour battery life", "Bluetooth 5.0", "Foldable design"],
  },
  "2": {
    id: 2,
    name: "Smartwatch with Heart Monitor",
    price: 199.99,
    category: "Wearables",
    description: "Advanced smartwatch with health monitoring features and fitness tracking. Track your daily activity and health metrics.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop",
    stock: 80,
    features: ["Heart rate monitor", "GPS tracking", "Water resistant (50m)", "AMOLED display"],
  },
  "3": {
    id: 3,
    name: "Portable Bluetooth Speaker",
    price: 89.99,
    category: "Audio",
    description: "Compact yet powerful Bluetooth speaker with amazing sound quality and portability.",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=600&fit=crop",
    stock: 230,
    features: ["Waterproof design", "20-hour battery", "360° sound", "Portable with strap"],
  },
  "4": {
    id: 4,
    name: "USB-C Charging Cable",
    price: 14.99,
    category: "Accessories",
    description: "Fast-charging USB-C cable with durable braided design. Perfect replacement for your device.",
    image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=600&h=600&fit=crop",
    stock: 500,
    features: ["Fast charging support", "Braided design", "2-meter length", "Durable and reliable"],
  },
  "5": {
    id: 5,
    name: "Wireless Mouse",
    price: 34.99,
    category: "Accessories",
    description: "Ergonomic wireless mouse with precision tracking for comfortable all-day use.",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=600&h=600&fit=crop",
    stock: 120,
    features: ["Ergonomic design", "Precision tracking", "6-month battery", "2.4GHz wireless"],
  },
  "6": {
    id: 6,
    name: "4K Webcam",
    price: 129.99,
    category: "Electronics",
    description: "Professional 4K webcam with auto-focus and noise reduction for crystal clear video calls.",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&h=600&fit=crop",
    stock: 45,
    features: ["4K resolution", "Auto-focus", "Noise reduction", "Wide angle lens"],
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

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const product = products[params.id]

    if (!product) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 })
    }

    const formData = await request.formData()
    const name = formData.get("name") as string
    const price = formData.get("price") ? parseFloat(formData.get("price") as string) : undefined
    const category = formData.get("category") as string
    const description = formData.get("description") as string
    const stock = formData.get("stock") ? parseInt(formData.get("stock") as string) : undefined
    const features = formData.get("features") ? JSON.parse(formData.get("features") as string) : undefined
    const imageFile = formData.get("image") as File | null

    // Update product fields
    const updatedProduct = { ...products[params.id] }
    
    if (name) updatedProduct.name = name
    if (price !== undefined) updatedProduct.price = price
    if (category) updatedProduct.category = category
    if (description) updatedProduct.description = description
    if (stock !== undefined) updatedProduct.stock = stock
    if (features) updatedProduct.features = features

    if (imageFile) {
      const buffer = await imageFile.arrayBuffer()
      const base64 = Buffer.from(buffer).toString("base64")
      updatedProduct.image = `data:${imageFile.type};base64,${base64}`
    }

    products[params.id] = updatedProduct

    return NextResponse.json({
      success: true,
      data: updatedProduct,
    })
  } catch (error) {
    console.error("Error updating product:", error)
    return NextResponse.json(
      { success: false, error: "Failed to update product" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const product = products[params.id]

    if (!product) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 })
    }

    delete products[params.id]

    return NextResponse.json({
      success: true,
      data: product,
    })
  } catch (error) {
    console.error("Error deleting product:", error)
    return NextResponse.json(
      { success: false, error: "Failed to delete product" },
      { status: 500 }
    )
  }
}
