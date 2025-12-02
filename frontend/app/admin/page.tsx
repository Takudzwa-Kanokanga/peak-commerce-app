"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"
import { TrendingUp, ShoppingCart, Users, DollarSign } from "lucide-react"

const chartData = [
  { month: "Jan", sales: 4000, orders: 240 },
  { month: "Feb", sales: 3000, orders: 221 },
  { month: "Mar", sales: 2000, orders: 229 },
  { month: "Apr", sales: 2780, orders: 200 },
  { month: "May", sales: 1890, orders: 229 },
  { month: "Jun", sales: 2390, orders: 200 },
]

const stats = [
  { label: "Total Orders", value: "1,250", change: "+12.5%", icon: ShoppingCart, color: "text-blue-500" },
  { label: "Total Revenue", value: "$85,000", change: "+8.2%", icon: DollarSign, color: "text-green-500" },
  { label: "New Customers", value: "120", change: "-2.5%", icon: Users, color: "text-purple-500" },
  { label: "Growth", value: "23%", change: "+5.1%", icon: TrendingUp, color: "text-orange-500" },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Welcome to Peak Commerce Admin</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <div key={i} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-400 text-sm font-semibold">{stat.label}</h3>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-2xl md:text-3xl font-bold text-white mb-2">{stat.value}</p>
              <p className={`text-sm ${stat.change.includes("-") ? "text-red-400" : "text-green-400"}`}>
                {stat.change} from last month
              </p>
            </div>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-white font-semibold mb-6">Sales & Orders</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151" }}
                labelStyle={{ color: "#fff" }}
              />
              <Legend />
              <Bar dataKey="sales" fill="#2563eb" radius={[8, 8, 0, 0]} />
              <Bar dataKey="orders" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Trend */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-white font-semibold mb-6">Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #374151" }}
                labelStyle={{ color: "#fff" }}
              />
              <Line type="monotone" dataKey="sales" stroke="#2563eb" strokeWidth={2} dot={{ fill: "#2563eb" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-white font-semibold mb-6">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-400">Order ID</th>
                <th className="text-left py-3 px-4 text-gray-400">Customer</th>
                <th className="text-left py-3 px-4 text-gray-400">Amount</th>
                <th className="text-left py-3 px-4 text-gray-400">Status</th>
                <th className="text-left py-3 px-4 text-gray-400">Date</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: "ORD001", customer: "Alice Johnson", amount: "$249.99", status: "Delivered", date: "2023-10-26" },
                { id: "ORD002", customer: "Bob Williams", amount: "$129.50", status: "Shipped", date: "2023-10-25" },
                { id: "ORD003", customer: "Charlie Brown", amount: "$59.00", status: "Pending", date: "2023-10-25" },
                { id: "ORD004", customer: "Diana Miller", amount: "$450.00", status: "Delivered", date: "2023-10-24" },
                { id: "ORD005", customer: "Eve Davis", amount: "$89.99", status: "Cancelled", date: "2023-10-23" },
              ].map((order) => (
                <tr key={order.id} className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors">
                  <td className="py-3 px-4 text-white">{order.id}</td>
                  <td className="py-3 px-4 text-gray-300">{order.customer}</td>
                  <td className="py-3 px-4 text-white font-semibold">{order.amount}</td>
                  <td className="py-3 px-4">
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
                  <td className="py-3 px-4 text-gray-400">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
