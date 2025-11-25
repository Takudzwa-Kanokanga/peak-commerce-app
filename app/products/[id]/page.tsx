"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { useParams } from "next/navigation"
import Image from "next/image"
import { useState } from "react"
import { Star, ShoppingCart, Truck, Shield } from "lucide-react"

// Mock product data - replace with API call in production
const products: Record<string, any> = {
  "1": {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 79.99,
    rating: 4.8,
    reviews: 234,
    image: "/wireless-bluetooth-headphones.jpg",
    category: "Audio",
    description: "Premium wireless headphones with active noise cancellation and 30-hour battery life.",
    features: [
      "Active Noise Cancellation (ANC)",
      "30-hour battery life",
      "Bluetooth 5.0",
      "Foldable design",
      "Built-in microphone",
      "Touch controls",
    ],
    inStock: true,
  },
  "2": {
    id: 2,
    name: "Smartwatch with Heart Monitor",
    price: 199.99,
    rating: 4.9,
    reviews: 456,
    image: "/smartwatch-heart-monitor.jpg",
    category: "Wearables",
    description: "Advanced smartwatch with health monitoring features and fitness tracking.",
    features: [
      "Heart rate monitor",
      "GPS tracking",
      "Water resistant (50m)",
      "AMOLED display",
      "Sleep tracking",
      "7-day battery life",
    ],
    inStock: true,
  },
  "3": {
    id: 3,
    name: "Portable Bluetooth Speaker",
    price: 89.99,
    rating: 4.7,
    reviews: 189,
    image: "/portable-bluetooth-speaker.jpg",
    category: "Audio",
    description: "Compact yet powerful Bluetooth speaker perfect for outdoor adventures.",
    features: [
      "360-degree sound",
      "IPX7 water resistance",
      "12-hour battery",
      "Portable design",
      "Stereo pairing",
      "Built-in microphone",
    ],
    inStock: true,
  },
}

export default function ProductPage() {
  const params = useParams()
  const product = products[params.id as string]
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)

  if (!product) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="pt-32 pb-12 text-center">
          <h1 className="text-2xl font-bold">Product not found</h1>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-24 pb-12 md:pb-16">
        <div className="container-responsive">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <a href="/shop" className="hover:text-primary">
              Shop
            </a>
            <span>/</span>
            <a href="/shop" className="hover:text-primary">
              {product.category}
            </a>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16">
            {/* Image */}
            <div>
              <div className="bg-white rounded-lg overflow-hidden sticky top-24">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={600}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Details */}
            <div>
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>

                {/* Rating */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="mb-8">
                  <span className="text-4xl font-bold text-primary">${product.price.toFixed(2)}</span>
                </div>

                {/* Description */}
                <p className="text-gray-700 mb-8 leading-relaxed">{product.description}</p>

                {/* Features */}
                <div className="mb-8">
                  <h3 className="font-semibold mb-4">Key Features</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-700">
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stock Status */}
                <div className="mb-8">
                  {product.inStock ? (
                    <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-semibold">
                      In Stock
                    </span>
                  ) : (
                    <span className="inline-block px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-semibold">
                      Out of Stock
                    </span>
                  )}
                </div>

                {/* Quantity & Add to Cart */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 text-gray-600 hover:text-gray-900"
                    >
                      −
                    </button>
                    <span className="px-6 py-2 border-l border-r border-gray-300">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-900"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      setIsAdded(true)
                      setTimeout(() => setIsAdded(false), 2000)
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {isAdded ? "Added to Cart!" : "Add to Cart"}
                  </button>
                </div>

                {/* Info Section */}
                <div className="space-y-4 border-t border-gray-200 pt-8">
                  <div className="flex items-start gap-4">
                    <Truck className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Free Shipping</h4>
                      <p className="text-sm text-gray-600">On all orders over $50</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-1">Secure Checkout</h4>
                      <p className="text-sm text-gray-600">Your payment is protected</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products Section */}
          <div className="border-t border-gray-200 pt-12">
            <h2 className="font-serif text-2xl font-bold mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Related products would go here */}
              <p className="text-gray-500">More products coming soon</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
