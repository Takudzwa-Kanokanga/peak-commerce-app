// app/shop/page.tsx

"use client"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Filter, Search } from "lucide-react"
import { useState, useMemo } from "react"

type Product = {
  id: number
  name: string
  price: number // Updated to number for sorting
  category: string
  image: string
}

type SortOption = "default" | "price-asc" | "price-desc" | "name-asc"

const allProducts: Product[] = [
  { id: 1, name: "Wireless Bluetooth Headphones", price: 79.99, category: "Audio", image: "/wireless-bluetooth-headphones.jpg" },
  { id: 2, name: "Smartwatch with Heart Monitor", price: 199.99, category: "Wearables", image: "/smartwatch-heart-monitor.jpg" },
  { id: 3, name: "Portable Bluetooth Speaker", price: 89.99, category: "Audio", image: "/portable-bluetooth-speaker.jpg" },
  { id: 4, name: "Ergonomic Mechanical Keyboard", price: 149.99, category: "Peripherals", image: "/mechanical-keyboard.png" },
  { id: 5, name: "4K Webcam", price: 99.99, category: "Video", image: "/4k-webcam.png" },
  { id: 6, name: "Power Bank 20000mAh", price: 35.99, category: "Accessories", image: "/portable-power-bank.png" },
]

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortOption, setSortOption] = useState<SortOption>("default")

  const categories = ["Audio", "Wearables", "Peripherals", "Video", "Accessories"]

  const processedProducts = useMemo(() => {
    let currentProducts = allProducts

    // 1. Filtering by Category
    if (selectedCategory) {
      currentProducts = currentProducts.filter(
        (product) => product.category === selectedCategory
      )
    }

    // 2. Searching
    if (searchTerm) {
      currentProducts = currentProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // 3. Sorting
    currentProducts = [...currentProducts].sort((a, b) => {
      switch (sortOption) {
        case "price-asc":
          return a.price - b.price
        case "price-desc":
          return b.price - a.price
        case "name-asc":
          return a.name.localeCompare(b.name)
        case "default":
        default:
          // Default sort can be by ID or a fixed order
          return 0
      }
    })

    return currentProducts
  }, [selectedCategory, searchTerm, sortOption])


  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-24 pb-12 md:pb-16">
        <div className="container-responsive">
          <div className="mb-10">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-2">Shop Our Catalog</h1>
            <p className="text-lg text-gray-600">Explore premium electronics and smart devices.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Filter Sidebar */}
            <div className="md:col-span-1">
              <div className="p-6 bg-white rounded-xl shadow-lg sticky top-24">
                <h3 className="font-serif text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
                  <Filter className="w-5 h-5 text-primary" /> Filters
                </h3>
                <div className="space-y-2">
                  {/* All/Reset Filter Button */}
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm font-medium ${
                      selectedCategory === null
                        ? "bg-primary text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    All Products
                  </button>
                  {/* Category Filters */}
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm font-medium ${
                        selectedCategory === category
                          ? "bg-primary text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Products List & Controls */}
            <div className="md:col-span-3">
              {/* Search & Sort Controls */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                {/* Search Input */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Sort Select */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <label htmlFor="sort" className="text-gray-700 text-sm font-medium hidden sm:block">Sort by:</label>
                  <select
                    id="sort"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value as SortOption)}
                    className="px-4 py-2 border border-gray-300 rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                  >
                    <option value="default">Default</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name-asc">Name: A-Z</option>
                  </select>
                </div>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {processedProducts.length > 0 ? (
                  processedProducts.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.id}`}
                      className="block bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden group"
                    >
                      {/* Image */}
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover group-hover:scale-[1.02] transition-transform duration-300"
                      />
                      <div className="p-5">
                        <p className="text-xs font-medium text-gray-500 mb-1">{product.category}</p>
                        <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors">{product.name}</h3>
                        <div className="flex items-center justify-between">
                          {/* Price (now formatted) */}
                          <span className="text-xl font-bold text-primary">${product.price.toFixed(2)}</span>
                          {/* Add to Cart Button */}
                          <button
                            className="p-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                            onClick={(e) => { e.preventDefault() }}
                            title="Add to Cart"
                          >
                            <ShoppingCart className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12 text-gray-500 bg-white rounded-xl shadow-lg">
                    <p className="text-lg">No products found matching your criteria.</p>
                    <button
                      onClick={() => {
                        setSelectedCategory(null)
                        setSearchTerm("")
                        setSortOption("default")
                      }}
                      className="mt-4 px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}