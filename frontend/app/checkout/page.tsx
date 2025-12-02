"use client"

import type React from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Link from "next/link"
import { useState, useEffect } from "react"
import { ChevronRight, Lock } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { useRouter } from "next/navigation"
import { useAuth } from "@clerk/nextjs"
import FormInput from "@/components/ui/form-input"
import LoadingSpinner from "@/components/ui/loading-spinner"
import ErrorMessage from "@/components/ui/error-message"
import PriceFormatter from "@/components/ui/price-formatter"
import { toast } from "sonner"

export default function CheckoutPage() {
  const router = useRouter()
  const { userId } = useAuth()
  const { cart, totalPrice, clearCart } = useCart()
  
  const [currentStep, setCurrentStep] = useState<"shipping" | "payment" | "review">("shipping")
  const [loading, setLoading] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "Zimbabwe",
    postalCode: "",
  })

  const [paymentMethod, setPaymentMethod] = useState("stripe")

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 50 ? 0 : 5.0
  const tax = subtotal * 0.08
  const orderTotal = subtotal + shipping + tax

  useEffect(() => {
    if (!userId) {
      router.push("/sign-in")
      return
    }

    if (cart.length === 0) {
      router.push("/cart")
    }
  }, [userId, cart.length, router])

  const validateShippingInfo = () => {
    const errors: string[] = []
    if (!shippingInfo.firstName.trim()) errors.push("First name required")
    if (!shippingInfo.lastName.trim()) errors.push("Last name required")
    if (!shippingInfo.email.trim()) errors.push("Email required")
    if (!shippingInfo.phone.trim()) errors.push("Phone number required")
    if (!shippingInfo.address.trim()) errors.push("Address required")
    if (!shippingInfo.city.trim()) errors.push("City required")
    if (!shippingInfo.postalCode.trim()) errors.push("Postal code required")

    if (errors.length > 0) {
      setError(errors.join(", "))
      return false
    }
    return true
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateShippingInfo()) {
      setError(null)
      setCurrentStep("payment")
    }
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentStep("review")
  }

  const handlePlaceOrder = async () => {
    setLoading(true)
    setError(null)

    try {
      // Validate cart items
      if (cart.length === 0) {
        setError("Your cart is empty")
        setLoading(false)
        return
      }

      const orderData = {
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        shippingInfo,
        paymentMethod,
        subtotal,
        shipping,
        tax,
        total: orderTotal,
      }

      // Create order
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      })

      if (!response.ok) {
        throw new Error("Failed to create order")
      }

      const result = await response.json()

      if (result.success) {
        setOrderSuccess(true)
        clearCart()
        toast.success("Order placed successfully! A confirmation email has been sent.")
        
        // Redirect to order tracking after 2 seconds
        setTimeout(() => {
          router.push(`/orders?orderId=${result.data.id}`)
        }, 2000)
      } else {
        setError(result.error || "Failed to place order")
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to place order"
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  if (orderSuccess) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Navigation />
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 mb-6">Your order has been placed successfully.</p>
          <p className="text-sm text-gray-500">Redirecting to order tracking...</p>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="pt-24 pb-12 md:pb-16">
        <div className="container-responsive max-w-4xl">
          {/* Step Indicator */}
          <div className="flex items-center justify-center gap-4 mb-12">
            {["shipping", "payment", "review"].map((step, index, array) => (
              <div key={step} className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    currentStep === step
                      ? "bg-primary text-white"
                      : array.indexOf(currentStep) > index
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {index + 1}
                </div>
                <span className="hidden sm:inline capitalize font-medium text-gray-700">{step}</span>
                {index < array.length - 1 && (
                  <ChevronRight className="w-5 h-5 text-gray-400 hidden sm:block" />
                )}
              </div>
            ))}
          </div>

          {error && (
            <ErrorMessage 
              message={error}
              onRetry={() => setError(null)}
            />
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              {/* SHIPPING */}
              {currentStep === "shipping" && (
                <form onSubmit={handleShippingSubmit} className="bg-white rounded-lg p-6 space-y-6">
                  <h2 className="text-2xl font-bold">Shipping Information</h2>

                  <div className="grid grid-cols-2 gap-4">
                    <FormInput
                      label="First Name"
                      required
                      value={shippingInfo.firstName}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                    />
                    <FormInput
                      label="Last Name"
                      required
                      value={shippingInfo.lastName}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                    />
                  </div>

                  <FormInput
                    label="Email"
                    type="email"
                    required
                    value={shippingInfo.email}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                  />

                  <FormInput
                    label="Phone Number"
                    type="tel"
                    required
                    value={shippingInfo.phone}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                    helpText="Include country code (e.g., +263701234567)"
                  />

                  <FormInput
                    label="Address"
                    required
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormInput
                      label="City"
                      required
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                    />
                    <FormInput
                      label="Postal Code"
                      required
                      value={shippingInfo.postalCode}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, postalCode: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                    <input
                      type="text"
                      value={shippingInfo.country}
                      disabled
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition"
                  >
                    Continue to Payment
                  </button>
                </form>
              )}

              {/* PAYMENT */}
              {currentStep === "payment" && (
                <form onSubmit={handlePaymentSubmit} className="bg-white rounded-lg p-6 space-y-6">
                  <h2 className="text-2xl font-bold">Payment Method</h2>

                  <div className="space-y-3">
                    <label className="flex items-center p-4 border-2 border-primary rounded-lg cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        value="stripe"
                        checked={paymentMethod === "stripe"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-3"
                      />
                      <div>
                        <p className="font-semibold">Credit/Debit Card (Stripe)</p>
                        <p className="text-sm text-gray-600">Secure payment via Stripe</p>
                      </div>
                    </label>

                    <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-gray-300">
                      <input
                        type="radio"
                        name="payment"
                        value="bank"
                        checked={paymentMethod === "bank"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-3"
                      />
                      <div>
                        <p className="font-semibold">Bank Transfer</p>
                        <p className="text-sm text-gray-600">Direct bank transfer (Zimbabwe)</p>
                      </div>
                    </label>
                  </div>

                  {paymentMethod === "stripe" && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-800">
                        <Lock className="inline w-4 h-4 mr-2" />
                        Your payment is secure and encrypted. Testing mode - use card: 4242 4242 4242 4242
                      </p>
                    </div>
                  )}

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep("shipping")}
                      className="flex-1 py-3 border border-gray-300 font-semibold rounded-lg hover:bg-gray-50"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition"
                    >
                      Review Order
                    </button>
                  </div>
                </form>
              )}

              {/* REVIEW */}
              {currentStep === "review" && (
                <div className="space-y-6">
                  {/* Shipping Review */}
                  <div className="bg-white rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold">Shipping Address</h2>
                      <button
                        onClick={() => setCurrentStep("shipping")}
                        className="text-primary hover:text-primary-dark text-sm"
                      >
                        Edit
                      </button>
                    </div>
                    <p className="text-gray-700">
                      {shippingInfo.firstName} {shippingInfo.lastName}<br />
                      {shippingInfo.address}<br />
                      {shippingInfo.city}, {shippingInfo.postalCode}<br />
                      {shippingInfo.country}<br />
                      {shippingInfo.email} • {shippingInfo.phone}
                    </p>
                  </div>

                  {/* Payment Review */}
                  <div className="bg-white rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold">Payment Method</h2>
                      <button
                        onClick={() => setCurrentStep("payment")}
                        className="text-primary hover:text-primary-dark text-sm"
                      >
                        Edit
                      </button>
                    </div>
                    <p className="text-gray-700 capitalize">{paymentMethod}</p>
                  </div>

                  {/* Items Review */}
                  <div className="bg-white rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">Order Items</h2>
                    <div className="space-y-3">
                      {cart.map((item) => (
                        <div key={item.id} className="flex justify-between py-2 border-b border-gray-200 last:border-0">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-semibold">
                            <PriceFormatter amount={item.price * item.quantity} currency="ZWL" />
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    className="w-full py-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition disabled:bg-gray-400"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="animate-spin">⟳</span> Processing...
                      </span>
                    ) : (
                      `Place Order - ${<PriceFormatter amount={orderTotal} currency="ZWL" />}`
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:sticky lg:top-24 lg:h-fit">
              <div className="bg-white rounded-lg p-6 space-y-4">
                <h3 className="font-bold text-lg">Order Summary</h3>

                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {item.name} x {item.quantity}
                      </span>
                      <span className="font-medium">
                        <PriceFormatter amount={item.price * item.quantity} currency="ZWL" />
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span><PriceFormatter amount={subtotal} currency="ZWL" /></span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span>{shipping === 0 ? "FREE" : <PriceFormatter amount={shipping} currency="ZWL" />}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax (8%)</span>
                    <span><PriceFormatter amount={tax} currency="ZWL" /></span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-primary">
                      <PriceFormatter amount={orderTotal} currency="ZWL" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
