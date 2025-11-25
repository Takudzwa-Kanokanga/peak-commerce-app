"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Filter } from "lucide-react"
import { useState } from "react"

const allProducts = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: "$79.99",
    category: "Audio",
    image: "/wireless-bluetooth-headphones.jpg",
  },
  {
    id: 2,
    name: "Smartwatch with Heart Monitor",
    price: "$199.99",
    category: "Wearables",
    image: "/smartwatch-heart-monitor.jpg",
  },
  {
    id: 3,
    name: "Portable Bluetooth Speaker",
    price: "$89.99",
    category: "Audio",
    image: "/portable-bluetooth-speaker.jpg",
  },
  {
    id: 4,
    name: "Ergonomic Mechanical Keyboard",
    price: "$149.99",
    category: "Peripherals",
    image: "/mechanical-keyboard.png",
  },
  {
    id: 5,
    name: "4K Webcam",
    price: "$99.99",
    category: "Video",
    image: "/4k-webcam.png",
  },
  {
    id: 6,
    name: "Power Bank 20000mAh",
    price: "$35.99",
    category: "Accessories",
    image: "/portable-power-bank.png",
  },
]

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = ["Audio", "Wearables", "Peripherals", "Video", "Accessories"]
  const filtered = selectedCategory ? allProducts.filter((p) => p.category === selectedCategory) : allProducts

  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-24 pb-12 md:pb-16">
        <div className="container-responsive">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">Shop All Products</h1>
          <p className="text-gray-600 mb-8">Browse our collection of premium electronics</p>

          {/* Filter */}
          <div className="flex flex-col md:flex-row gap-8 mb-12">
            <div className="md:w-48">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5" />
                <h3 className="font-semibold">Categories</h3>
              </div>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === null ? "bg-primary text-white" : "hover:bg-gray-200"
                  }`}
                >
                  All Products
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === cat ? "bg-primary text-white" : "hover:bg-gray-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((product) => (
                  <Link key={product.id} href={`/products/${product.id}`}>
                    <div className="group cursor-pointer">
                      <div className="relative bg-white rounded-lg overflow-hidden mb-4 aspect-square">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                      <h3 className="font-semibold text-lg mb-2 text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-primary">{product.price}</span>
                        <button
                          className="p-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                          onClick={(e) => {
                            e.preventDefault()
                          }}
                        >
                          <ShoppingCart className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
