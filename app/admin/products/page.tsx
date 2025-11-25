"use client"

import { useState } from "react"
import { Edit2, Trash2, Plus, Search } from "lucide-react"

const initialProducts = [
  { id: 1, name: "Wireless Bluetooth Headphones", price: "$79.99", stock: 150, category: "Audio" },
  { id: 2, name: "Smartwatch with Heart Monitor", price: "$199.99", stock: 80, category: "Wearables" },
  { id: 3, name: "Portable Bluetooth Speaker", price: "$89.99", stock: 230, category: "Audio" },
]

export default function AdminProducts() {
  const [products, setProducts] = useState(initialProducts)
  const [searchTerm, setSearchTerm] = useState("")

  const filtered = products.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-white mb-2">Products</h1>
          <p className="text-gray-400">Manage your product inventory</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors w-full md:w-auto justify-center md:justify-start">
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary"
        />
      </div>

      {/* Products Table */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700 bg-gray-900">
                <th className="text-left py-4 px-4 text-gray-400 font-semibold">Product Name</th>
                <th className="text-left py-4 px-4 text-gray-400 font-semibold">Category</th>
                <th className="text-left py-4 px-4 text-gray-400 font-semibold">Price</th>
                <th className="text-left py-4 px-4 text-gray-400 font-semibold">Stock</th>
                <th className="text-left py-4 px-4 text-gray-400 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => (
                <tr key={product.id} className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors">
                  <td className="py-4 px-4 text-white font-medium">{product.name}</td>
                  <td className="py-4 px-4 text-gray-300">{product.category}</td>
                  <td className="py-4 px-4 text-white font-semibold">{product.price}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        product.stock > 100
                          ? "bg-green-500/20 text-green-300"
                          : product.stock > 50
                            ? "bg-yellow-500/20 text-yellow-300"
                            : "bg-red-500/20 text-red-300"
                      }`}
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-600 rounded transition-colors text-primary">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-gray-600 rounded transition-colors text-red-400">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
