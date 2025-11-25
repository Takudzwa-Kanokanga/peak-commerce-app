"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"

const featuredProducts = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: "$79.99",
    image: "/wireless-bluetooth-headphones.jpg",
    category: "Audio",
  },
  {
    id: 2,
    name: "Smartwatch with Heart Monitor",
    price: "$199.99",
    image: "/smartwatch-heart-monitor.jpg",
    category: "Wearables",
  },
  {
    id: 3,
    name: "Portable Bluetooth Speaker",
    price: "$89.99",
    image: "/portable-bluetooth-speaker.jpg",
    category: "Audio",
  },
]

export default function FeaturedProducts() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container-responsive">
        <div className="mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-2">Featured Today</h2>
          <p className="text-gray-600">Handpicked products for the modern lifestyle</p>
        </div>

        <div className="grid-responsive">
          {featuredProducts.map((product) => (
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
                <h3 className="font-semibold text-lg mb-2 text-gray-900 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">{product.price}</span>
                  <button className="p-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
