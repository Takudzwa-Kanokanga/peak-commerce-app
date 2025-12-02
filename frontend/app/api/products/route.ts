import { type NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"

// Mock database - replace with actual MongoDB connection
let products = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 79.99,
    category: "Audio",
    description: "Premium wireless headphones with active noise cancellation",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
    stock: 150,
    features: ["Active Noise Cancellation (ANC)", "30-hour battery life", "Bluetooth 5.0", "Foldable design"],
  },
  {
    id: 2,
    name: "Smartwatch with Heart Monitor",
    price: 199.99,
    category: "Wearables",
    description: "Advanced smartwatch with health monitoring",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop",
    stock: 80,
    features: ["Heart rate monitor", "GPS tracking", "Water resistant (50m)", "AMOLED display"],
  },
  {
    id: 3,
    name: "Portable Bluetooth Speaker",
    price: 89.99,
    category: "Audio",
    description: "Compact yet powerful Bluetooth speaker",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=600&fit=crop",
    stock: 230,
    features: ["Waterproof design", "20-hour battery", "360° sound", "Portable with strap"],
  },
  {
    id: 4,
    name: "USB-C Charging Cable",
    price: 14.99,
    category: "Accessories",
    description: "Fast-charging USB-C cable with durable braided design",
    image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=600&h=600&fit=crop",
    stock: 500,
    features: ["Fast charging support", "Braided design", "2-meter length", "Durable and reliable"],
  },
  {
    id: 5,
    name: "Wireless Mouse",
    price: 34.99,
    category: "Accessories",
    description: "Ergonomic wireless mouse with precision tracking",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=600&h=600&fit=crop",
    stock: 120,
    features: ["Ergonomic design", "Precision tracking", "6-month battery", "2.4GHz wireless"],
  },
  {
    id: 6,
    name: "4K Webcam",
    price: 129.99,
    category: "Electronics",
    description: "Professional 4K webcam with auto-focus and noise reduction",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&h=600&fit=crop",
    stock: 45,
    features: ["4K resolution", "Auto-focus", "Noise reduction", "Wide angle lens"],
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

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const name = formData.get("name") as string
    const price = parseFloat(formData.get("price") as string)
    const category = formData.get("category") as string
    const description = formData.get("description") as string
    const stock = parseInt(formData.get("stock") as string)
    const features = JSON.parse(formData.get("features") as string || "[]")
    const imageFile = formData.get("image") as File | null

    // Validate required fields
    if (!name || !price || !category || !description || stock === undefined) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Handle image upload (for now, store as base64 or URL)
    let image = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop"
    if (imageFile) {
      const buffer = await imageFile.arrayBuffer()
      const base64 = Buffer.from(buffer).toString("base64")
      image = `data:${imageFile.type};base64,${base64}`
    }

    const newProduct = {
      id: Math.max(...products.map(p => p.id), 0) + 1,
      name,
      price,
      category,
      description,
      stock,
      features,
      image,
    }

    products.push(newProduct)

    return NextResponse.json({
      success: true,
      data: newProduct,
    })
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json(
      { success: false, error: "Failed to create product" },
      { status: 500 }
    )
  }
}
