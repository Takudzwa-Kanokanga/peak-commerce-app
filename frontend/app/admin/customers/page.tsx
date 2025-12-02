"use client"

import { useState } from "react"
import { Search, Mail, Phone } from "lucide-react"

const customers = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "+1 (555) 123-4567",
    orders: 5,
    spent: "$1,249.95",
  },
  { id: 2, name: "Bob Williams", email: "bob@example.com", phone: "+1 (555) 234-5678", orders: 3, spent: "$599.97" },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@example.com",
    phone: "+1 (555) 345-6789",
    orders: 8,
    spent: "$2,199.92",
  },
]

export default function AdminCustomers() {
  const [searchTerm, setSearchTerm] = useState("")

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-white mb-2">Customers</h1>
        <p className="text-gray-400">View and manage customer information</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary"
        />
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((customer) => (
          <div key={customer.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="font-semibold text-white mb-4">{customer.name}</h3>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-gray-300 text-sm">
                <Mail className="w-4 h-4 text-primary" />
                <a href={`mailto:${customer.email}`}>{customer.email}</a>
              </div>
              <div className="flex items-center gap-3 text-gray-300 text-sm">
                <Phone className="w-4 h-4 text-primary" />
                {customer.phone}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 border-t border-gray-700 pt-4">
              <div>
                <p className="text-gray-400 text-sm">Orders</p>
                <p className="text-xl font-bold text-white">{customer.orders}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Spent</p>
                <p className="text-xl font-bold text-primary">{customer.spent}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
