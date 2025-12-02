"use client"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { Trash2, ArrowLeft } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { useEffect, useState } from "react"
import LoadingSpinner from "@/components/ui/loading-spinner"
import ErrorMessage from "@/components/ui/error-message"
import PriceFormatter from "@/components/ui/price-formatter"

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice, isLoading, error, clearCart } = useCart()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <LoadingSpinner text="Loading cart..." />
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 50 ? 0 : 5.00
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    updateQuantity(id, newQuantity)
  }

  const handleRemoveItem = (id: number) => {
    removeFromCart(id)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-24 pb-12 md:pb-16">
        <div className="container-responsive">
          <Link href="/shop" className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-8">
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>

          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-8">Your Shopping Cart</h1>

          {error && (
            <ErrorMessage 
              message={error} 
              onRetry={() => window.location.reload()}
            />
          )}

          {cart.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">Your cart is empty</p>
              <Link
                href="/shop"
                className="inline-block px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg divide-y divide-gray-200">
                  {cart.map((item) => (
                    <div key={item.id} className="p-6 flex gap-6">
                      <div className="relative w-24 h-24">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                        <p className="text-primary font-semibold mb-4">
                          <PriceFormatter amount={item.price} currency="ZWL" />
                        </p>

                        <div className="flex items-center gap-4">
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              className="px-3 py-1 text-gray-600 hover:text-gray-900"
                            >
                              −
                            </button>
                            <span className="px-4 py-1 border-l border-r border-gray-300">{item.quantity}</span>
                            <button
                              onClick={() => {
                                if (item.stock && item.quantity >= item.stock) {
                                  alert(`Only ${item.stock} items available`)
                                  return
                                }
                                handleUpdateQuantity(item.id, item.quantity + 1)
                              }}
                              className="px-3 py-1 text-gray-600 hover:text-gray-900"
                            >
                              +
                            </button>
                          </div>

                          <span className="text-gray-600 text-sm">
                            {item.stock && item.quantity <= item.stock ? (
                              `${item.stock - item.quantity} in stock`
                            ) : item.stock ? (
                              <span className="text-red-600">Only {item.stock} available</span>
                            ) : (
                              "Stock info unavailable"
                            )}
                          </span>

                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="ml-auto px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={clearCart}
                  className="mt-4 text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  Clear Cart
                </button>
              </div>

              {/* Summary */}
              <div className="lg:sticky lg:top-24 lg:h-fit">
                <div className="bg-white rounded-lg p-6 space-y-4">
                  <h2 className="font-semibold text-lg">Order Summary</h2>

                  <div className="space-y-2 text-sm border-b border-gray-200 pb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">
                        <PriceFormatter amount={subtotal} currency="ZWL" />
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">
                        {shipping === 0 ? "FREE" : <PriceFormatter amount={shipping} currency="ZWL" />}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax (8%)</span>
                      <span className="font-medium">
                        <PriceFormatter amount={tax} currency="ZWL" />
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">
                      <PriceFormatter amount={total} currency="ZWL" />
                    </span>
                  </div>

                  <Link
                    href="/checkout"
                    className="w-full py-3 bg-primary text-white font-semibold rounded-lg text-center hover:bg-primary-dark transition"
                  >
                    Proceed to Checkout
                  </Link>

                  {subtotal > 0 && subtotal < 50 && (
                    <p className="text-xs text-gray-500 text-center">
                      Add ZWL {(50 - subtotal).toFixed(2)} more for free shipping!
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
                          <button onClick={() => removeItem(item.id)} className="text-red-600 hover:text-red-800 p-2">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <div className="bg-white rounded-lg p-6 sticky top-24">
                  <h2 className="font-serif text-xl font-bold mb-6">Order Summary</h2>

                  <div className="space-y-4 mb-6 border-b border-gray-200 pb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-semibold">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-semibold">{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-semibold">${tax.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between mb-8">
                    <span className="font-bold text-lg">Total</span>
                    <span className="font-bold text-lg text-primary">${total.toFixed(2)}</span>
                  </div>

                  <Link
                    href="/checkout"
                    className="w-full block text-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}
