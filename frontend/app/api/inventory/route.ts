import { type NextRequest, NextResponse } from "next/server"

// Mock inventory database
let inventory: Record<number, { productId: number; stock: number; reserved: number }> = {
  1: { productId: 1, stock: 150, reserved: 0 },
  2: { productId: 2, stock: 80, reserved: 0 },
  3: { productId: 3, stock: 230, reserved: 0 },
  4: { productId: 4, stock: 500, reserved: 0 },
  5: { productId: 5, stock: 120, reserved: 0 },
  6: { productId: 6, stock: 45, reserved: 0 },
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get("productId")

    if (productId) {
      const inv = inventory[parseInt(productId)]
      if (!inv) {
        return NextResponse.json(
          { success: false, error: "Product not found in inventory" },
          { status: 404 }
        )
      }

      return NextResponse.json({
        success: true,
        data: {
          ...inv,
          available: inv.stock - inv.reserved,
        },
      })
    }

    // Return all inventory with available quantities
    const allInventory = Object.values(inventory).map(inv => ({
      ...inv,
      available: inv.stock - inv.reserved,
    }))

    return NextResponse.json({
      success: true,
      data: allInventory,
    })
  } catch (error) {
    console.error("Error fetching inventory:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch inventory" },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { productId, quantity, action } = body

    // Validate required fields
    if (!productId || quantity === undefined || !action) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      )
    }

    if (!inventory[productId]) {
      return NextResponse.json(
        { success: false, error: "Product not found in inventory" },
        { status: 404 }
      )
    }

    const inv = inventory[productId]

    // Handle different actions
    if (action === "reserve") {
      // Reserve stock for pending orders
      if (inv.stock - inv.reserved < quantity) {
        return NextResponse.json(
          { success: false, error: "Insufficient stock" },
          { status: 400 }
        )
      }
      inv.reserved += quantity
    } else if (action === "release") {
      // Release reserved stock
      inv.reserved = Math.max(0, inv.reserved - quantity)
    } else if (action === "deduct") {
      // Deduct from stock (when order is fulfilled)
      if (inv.stock < quantity) {
        return NextResponse.json(
          { success: false, error: "Insufficient stock" },
          { status: 400 }
        )
      }
      inv.stock -= quantity
      inv.reserved = Math.max(0, inv.reserved - quantity)
    } else if (action === "add") {
      // Add stock (restock)
      inv.stock += quantity
    }

    return NextResponse.json({
      success: true,
      data: {
        ...inv,
        available: inv.stock - inv.reserved,
      },
    })
  } catch (error) {
    console.error("Error updating inventory:", error)
    return NextResponse.json(
      { success: false, error: "Failed to update inventory" },
      { status: 500 }
    )
  }
}
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to update inventory" }, { status: 500 })
  }
}
