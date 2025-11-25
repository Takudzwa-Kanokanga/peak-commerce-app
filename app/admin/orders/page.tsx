"use client"

import { useState } from "react"
import { Eye, Search } from "lucide-react"

const orders = [
  { id: "ORD001", customer: "Alice Johnson", amount: "$249.99", status: "Delivered", date: "2023-10-26" },
  { id: "ORD002", customer: "Bob Williams", amount: "$129.50", status: "Shipped", date: "2023-10-25" },
  { id: "ORD003", customer: "Charlie Brown", amount: "$59.00", status: "Pending", date: "2023-10-25" },
  { id: "ORD004", customer: "Diana Miller", amount: "$450.00", status: "Delivered", date: "2023-10-24" },
  { id: "ORD005", customer: "Eve Davis", amount: "$89.99", status: "Cancelled", date: "2023-10-23" },
]

export default function AdminOrders() {
  const [searchTerm, setSearchTerm] = useState("")

  const filtered = orders.filter(
    (o) =>
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-white mb-2">Orders</h1>
        <p className="text-gray-400">Track and manage customer orders</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by order ID or customer..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary"
        />
      </div>

      {/* Orders Table */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700 bg-gray-900">
                <th className="text-left py-4 px-4 text-gray-400 font-semibold">Order ID</th>
                <th className="text-left py-4 px-4 text-gray-400 font-semibold">Customer</th>
                <th className="text-left py-4 px-4 text-gray-400 font-semibold">Amount</th>
                <th className="text-left py-4 px-4 text-gray-400 font-semibold">Status</th>
                <th className="text-left py-4 px-4 text-gray-400 font-semibold">Date</th>
                <th className="text-left py-4 px-4 text-gray-400 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => (
                <tr key={order.id} className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors">
                  <td className="py-4 px-4 text-white font-medium">{order.id}</td>
                  <td className="py-4 px-4 text-gray-300">{order.customer}</td>
                  <td className="py-4 px-4 text-white font-semibold">{order.amount}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === "Delivered"
                          ? "bg-green-500/20 text-green-300"
                          : order.status === "Shipped"
                            ? "bg-blue-500/20 text-blue-300"
                            : order.status === "Pending"
                              ? "bg-yellow-500/20 text-yellow-300"
                              : "bg-red-500/20 text-red-300"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-400">{order.date}</td>
                  <td className="py-4 px-4">
                    <button className="p-2 hover:bg-gray-600 rounded transition-colors text-primary">
                      <Eye className="w-4 h-4" />
                    </button>
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
