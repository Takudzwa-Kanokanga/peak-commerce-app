"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { ChevronDown } from "lucide-react"
import LoadingSpinner from "@/components/ui/loading-spinner"
import ErrorMessage from "@/components/ui/error-message"
import PriceFormatter from "@/components/ui/price-formatter"
import { toast } from "sonner"

interface OrderItem {
  id: number
  name: string
  quantity: number
  price: number
}

interface Order {
  id: string
  userId: string
  status: "Pending" | "Processing" | "Fulfilled"
  total: number
  createdAt: string
  items: OrderItem[]
  shippingInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
    city: string
    postalCode: string
    country: string
  }
}

const statusConfig = {
  Pending: { color: "bg-yellow-100 text-yellow-800", label: "Pending" },
  Processing: { color: "bg-blue-100 text-blue-800", label: "Processing" },
  Fulfilled: { color: "bg-green-100 text-green-800", label: "Fulfilled" },
}

export default function AdminOrdersPage() {
  const { userId } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) {
      router.push("/sign-in")
      return
    }
    fetchAllOrders()
  }, [userId, router])

  const fetchAllOrders = async () => {
    try {
      setLoading(true)
      // In production, create an admin endpoint to fetch all orders
      const response = await fetch("/api/orders")
      if (!response.ok) throw new Error("Failed to fetch orders")
      const result = await response.json()
      setOrders(result.data || [])
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load orders"
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (orderId: string, newStatus: "Pending" | "Processing" | "Fulfilled") => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) throw new Error("Failed to update order")

      setOrders(orders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      ))

      toast.success(`Order status updated to ${newStatus}`)
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to update status"
      toast.error(message)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="pt-32 pb-12 flex items-center justify-center">
          <LoadingSpinner text="Loading orders..." />
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
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-8">Order Management</h1>

          {error && <ErrorMessage message={error} onRetry={fetchAllOrders} />}

          {orders.length === 0 ? (
            <div className="bg-white rounded-lg p-12 text-center">
              <p className="text-gray-600">No orders found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition"
                >
                  <button
                    onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-4 flex-1 text-left">
                      <div>
                        <p className="font-semibold">Order #{order.id.slice(0, 8)}</p>
                        <p className="text-sm text-gray-600">
                          {order.shippingInfo.firstName} {order.shippingInfo.lastName} • {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-semibold">
                          <PriceFormatter amount={order.total} currency="ZWL" />
                        </p>
                        <p className="text-sm text-gray-600">{order.items.length} items</p>
                      </div>

                      <select
                        value={order.status}
                        onChange={(e) => {
                          e.stopPropagation()
                          handleStatusChange(order.id, e.target.value as any)
                        }}
                        className={`px-3 py-1 rounded text-sm font-medium cursor-pointer ${
                          statusConfig[order.status].color
                        }`}
                      >
                        {Object.entries(statusConfig).map(([key, config]) => (
                          <option key={key} value={key}>
                            {config.label}
                          </option>
                        ))}
                      </select>

                      <ChevronDown
                        className={`w-5 h-5 text-gray-400 transition ${
                          expandedOrder === order.id ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>

                  {expandedOrder === order.id && (
                    <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h3 className="font-semibold text-sm text-gray-600 mb-3">Shipping Address</h3>
                          <p className="text-sm text-gray-900">
                            {order.shippingInfo.firstName} {order.shippingInfo.lastName}<br />
                            {order.shippingInfo.address}<br />
                            {order.shippingInfo.city}, {order.shippingInfo.postalCode}<br />
                            {order.shippingInfo.country}<br />
                            {order.shippingInfo.email}<br />
                            {order.shippingInfo.phone}
                          </p>
                        </div>

                        <div>
                          <h3 className="font-semibold text-sm text-gray-600 mb-3">Order Details</h3>
                          <p className="text-sm text-gray-900">
                            Order ID: {order.id}<br />
                            User ID: {order.userId}<br />
                            Created: {new Date(order.createdAt).toLocaleString()}<br />
                            Status: {order.status}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-sm text-gray-600 mb-3">Items Ordered</h3>
                        <div className="space-y-2">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-sm py-2 border-b border-gray-200 last:border-0">
                              <div>
                                <p className="text-gray-900">{item.name}</p>
                                <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                              </div>
                              <p className="font-medium">
                                <PriceFormatter amount={item.price * item.quantity} currency="ZWL" />
                              </p>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="flex justify-between font-bold">
                            <span>Total</span>
                            <span className="text-primary">
                              <PriceFormatter amount={order.total} currency="ZWL" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
