// components/cart/cart-item.tsx
"use client"

import Image from "next/image"
import { Trash2, Plus, Minus } from "lucide-react"
import PriceFormatter from "@/components/ui/price-formatter"
import { useState } from "react"

interface CartItemProps {
  id: number
  name: string
  price: number
  image: string
  quantity: number
  stock?: number
  onQuantityChange: (quantity: number) => void
  onRemove: () => void
}

export default function CartItem({
  id,
  name,
  price,
  image,
  quantity,
  stock,
  onQuantityChange,
  onRemove,
}: CartItemProps) {
  const [quantityError, setQuantityError] = useState<string | null>(null)

  const handleIncrease = () => {
    if (stock && quantity >= stock) {
      setQuantityError(`Only ${stock} items available`)
      return
    }
    setQuantityError(null)
    onQuantityChange(quantity + 1)
  }

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantityError(null)
      onQuantityChange(quantity - 1)
    }
  }

  const totalPrice = price * quantity
  const isStockLimited = !!stock && quantity >= stock

  return (
    <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 border-b border-gray-200 hover:bg-gray-50 transition">
      {/* Product Image */}
      <div className="relative w-full sm:w-20 h-32 sm:h-20 flex-shrink-0">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover rounded-lg"
          sizes="(max-width: 640px) 100vw, 80px"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <h3 className="font-semibold text-base sm:text-lg mb-2 line-clamp-2">{name}</h3>
          <p className="text-primary font-semibold mb-2 text-sm sm:text-base">
            <PriceFormatter amount={price} currency="ZWL" />
          </p>

          {/* Stock Status */}
          <div className="text-xs sm:text-sm text-gray-600 mb-3">
            {stock ? (
              <span className={isStockLimited ? "text-red-600 font-medium" : ""}>
                {isStockLimited ? `Only ${stock} available` : `${stock - quantity} in stock`}
              </span>
            ) : (
              <span>Stock info unavailable</span>
            )}
          </div>

          {/* Error Message */}
          {quantityError && (
            <p className="text-xs text-red-600 mb-2">{quantityError}</p>
          )}
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center border border-gray-300 rounded-lg bg-white">
            <button
              onClick={handleDecrease}
              disabled={quantity <= 1}
              className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="px-3 py-1 border-l border-r border-gray-300 font-medium text-sm w-12 text-center">
              {quantity}
            </span>
            <button
              onClick={handleIncrease}
              disabled={isStockLimited}
              className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Total Price */}
          <div className="font-semibold text-base sm:text-lg whitespace-nowrap ml-4">
            <PriceFormatter amount={totalPrice} currency="ZWL" />
          </div>

          {/* Remove Button */}
          <button
            onClick={onRemove}
            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition ml-2"
            aria-label="Remove item"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
