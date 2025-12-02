"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { useAuth } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import LoadingSpinner from "@/components/ui/loading-spinner"
import ErrorMessage from "@/components/ui/error-message"
import PriceFormatter from "@/components/ui/price-formatter"
import { CheckCircle, Clock, Truck } from "lucide-react"

interface Order {
  id: string
  status: "Pending" | "Processing" | "Fulfilled"
  total: number
  createdAt: string
  items: Array<{
    id: number
    name: string
    quantity: number
    price: number
  }>
  shippingInfo: {
    firstName: string
    lastName: string
    address: string
    city: string
    postalCode: string
  }
}

const statusConfig = {
  Pending: {
    icon: Clock,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    label: "Pending",
    description: "We're processing your order",
  },
  Processing: {
    icon: Truck,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    label: "Processing",
    description: "Your order is being prepared",
  },
  Fulfilled: {
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    label: "Fulfilled",
    description: "Your order has been delivered",
  },
}

export default function OrdersPage() {
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

    fetchOrders()
  }, [userId, router])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/orders")
      
      if (!response.ok) {
        throw new Error("Failed to fetch orders")
      }

      const result = await response.json()
      setOrders(result.data || [])
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load orders"
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="pt-32 pb-12 flex items-center justify-center">
          <LoadingSpinner text="Loading your orders..." />
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
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">My Orders</h1>
          <p className="text-gray-600 mb-8">Track your orders and view details</p>

          {error && (
            <ErrorMessage 
              message={error}
              onRetry={fetchOrders}
            />
          )}

          {orders.length === 0 ? (
            <div className="bg-white rounded-lg p-12 text-center">
              <p className="text-gray-600 mb-4">You haven't placed any orders yet</p>
              <a
                href="/shop"
                className="inline-block px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
              >
                Continue Shopping
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => {
                const config = statusConfig[order.status as keyof typeof statusConfig]
                const StatusIcon = config.icon
                const isExpanded = expandedOrder === order.id

                return (
                  <div
                    key={order.id}
                    className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition"
                  >
                    <button
                      onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                      className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-4 text-left flex-1">
                        <div className={`p-3 ${config.bgColor} rounded-lg`}>
                          <StatusIcon className={`${config.color} w-6 h-6`} />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold">Order #{order.id.slice(0, 8)}</span>
                            <span className={`text-sm font-medium px-2 py-1 rounded ${config.bgColor} ${config.color}`}>
                              {config.label}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">
                            {new Date(order.createdAt).toLocaleDateString()} • {order.items.length} item(s)
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="font-semibold">
                            <PriceFormatter amount={order.total} currency="ZWL" />
                          </p>
                          <p className="text-sm text-gray-600">{config.description}</p>
                        </div>
                      </div>

                      <svg
                        className={`w-5 h-5 text-gray-400 transition ${isExpanded ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </button>

                    {isExpanded && (
                      <div className={`border-t ${config.borderColor} px-6 py-4 bg-gray-50`}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <h3 className="font-semibold text-sm text-gray-600 mb-3">Shipping Address</h3>
                            <p className="text-sm text-gray-900">
                              {order.shippingInfo.firstName} {order.shippingInfo.lastName}<br />
                              {order.shippingInfo.address}<br />
                              {order.shippingInfo.city}, {order.shippingInfo.postalCode}
                            </p>
                          </div>

                          <div>
                            <h3 className="font-semibold text-sm text-gray-600 mb-3">Order Summary</h3>
                            <p className="text-sm text-gray-900">
                              {order.items.length} product(s)<br />
                              Total: <PriceFormatter amount={order.total} currency="ZWL" />
                            </p>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-semibold text-sm text-gray-600 mb-3">Items</h3>
                          <div className="space-y-2">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex justify-between text-sm">
                                <span className="text-gray-700">
                                  {item.name} x {item.quantity}
                                </span>
                                <span className="font-medium">
                                  <PriceFormatter 
                                    amount={item.price * item.quantity} 
                                    currency="ZWL" 
                                  />
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
