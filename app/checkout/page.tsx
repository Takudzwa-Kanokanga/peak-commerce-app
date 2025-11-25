"use client"

import type React from "react"

import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Link from "next/link"
import { useState } from "react"
import { ChevronRight, Lock } from "lucide-react"

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState<"shipping" | "payment" | "review">("shipping")
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    address: "",
    apartment: "",
    city: "",
    country: "United States",
    postalCode: "",
    phone: "",
  })

  const [paymentMethod, setPaymentMethod] = useState("card")

  const orderTotal = 852.24
  const subtotal = 784.48
  const shipping = 5.0
  const tax = 62.76

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentStep("payment")
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentStep("review")
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-24 pb-12 md:pb-16">
        <div className="container-responsive">
          {/* Step Indicator */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className={`flex items-center gap-2 ${currentStep === "shipping" ? "text-primary" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                  currentStep === "shipping" ? "bg-primary text-white" : "bg-gray-200"
                }`}
              >
                1
              </div>
              <span className="hidden sm:inline">Shipping</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300" />
            <div className={`flex items-center gap-2 ${currentStep === "payment" ? "text-primary" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                  currentStep === "payment" ? "bg-primary text-white" : "bg-gray-200"
                }`}
              >
                2
              </div>
              <span className="hidden sm:inline">Payment</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-300" />
            <div className={`flex items-center gap-2 ${currentStep === "review" ? "text-primary" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                  currentStep === "review" ? "bg-primary text-white" : "bg-gray-200"
                }`}
              >
                3
              </div>
              <span className="hidden sm:inline">Review</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              {/* Shipping Step */}
              {currentStep === "shipping" && (
                <div className="bg-white rounded-lg p-6 md:p-8">
                  <h2 className="font-serif text-2xl font-bold mb-6">Shipping Information</h2>
                  <form onSubmit={handleShippingSubmit} className="space-y-6">
                    {/* Name Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">First Name *</label>
                        <input
                          type="text"
                          required
                          value={shippingInfo.firstName}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Last Name *</label>
                        <input
                          type="text"
                          required
                          value={shippingInfo.lastName}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold mb-2">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={shippingInfo.email}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="john@example.com"
                      />
                    </div>

                    {/* Company */}
                    <div>
                      <label className="block text-sm font-semibold mb-2">Company Name</label>
                      <input
                        type="text"
                        value={shippingInfo.company}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, company: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Peak Solutions Inc."
                      />
                    </div>

                    {/* Address */}
                    <div>
                      <label className="block text-sm font-semibold mb-2">Street Address *</label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.address}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="123 Main Street"
                      />
                    </div>

                    {/* Apartment */}
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Apartment, suite, unit, etc. (optional)
                      </label>
                      <input
                        type="text"
                        value={shippingInfo.apartment}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, apartment: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Suite 100"
                      />
                    </div>

                    {/* City & Country */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">City / Town *</label>
                        <input
                          type="text"
                          required
                          value={shippingInfo.city}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="New York"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Country / Region *</label>
                        <select
                          value={shippingInfo.country}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option>United States</option>
                          <option>Canada</option>
                          <option>Mexico</option>
                        </select>
                      </div>
                    </div>

                    {/* Postal Code & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Postal Code / ZIP *</label>
                        <input
                          type="text"
                          required
                          value={shippingInfo.postalCode}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, postalCode: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="10001"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          value={shippingInfo.phone}
                          onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>

                    {/* Ship to Different Address */}
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="w-4 h-4 rounded" />
                      Ship to a different address?
                    </label>

                    {/* Order Notes */}
                    <div>
                      <label className="block text-sm font-semibold mb-2">Order Notes (optional)</label>
                      <textarea
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Notes about your order, e.g. special notes for delivery."
                        rows={4}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
                    >
                      Continue to Payment
                    </button>
                  </form>
                </div>
              )}

              {/* Payment Step */}
              {currentStep === "payment" && (
                <div className="bg-white rounded-lg p-6 md:p-8">
                  <h2 className="font-serif text-2xl font-bold mb-6">Payment Method</h2>
                  <form onSubmit={handlePaymentSubmit} className="space-y-6">
                    {/* Payment Method Selection */}
                    <div className="space-y-4">
                      <label className="flex items-center gap-3 p-4 border-2 border-primary rounded-lg cursor-pointer">
                        <input
                          type="radio"
                          name="payment"
                          value="card"
                          checked={paymentMethod === "card"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-4 h-4"
                        />
                        <span className="font-semibold">Credit / Debit Card</span>
                      </label>
                      <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-gray-300">
                        <input
                          type="radio"
                          name="payment"
                          value="paypal"
                          checked={paymentMethod === "paypal"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-4 h-4"
                        />
                        <span className="font-semibold">PayPal</span>
                      </label>
                    </div>

                    {/* Card Details */}
                    {paymentMethod === "card" && (
                      <div className="space-y-4 border-t border-gray-200 pt-6">
                        <div>
                          <label className="block text-sm font-semibold mb-2">Card Number</label>
                          <input
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold mb-2">Expiration Date</label>
                            <input
                              type="text"
                              placeholder="MM / YY"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold mb-2">Security Code</label>
                            <input
                              type="text"
                              placeholder="CVC"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                          </div>
                        </div>
                        <label className="flex items-center gap-2 text-sm">
                          <input type="checkbox" className="w-4 h-4 rounded" defaultChecked />
                          Save payment information to my account for future purchases.
                        </label>
                      </div>
                    )}

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setCurrentStep("shipping")}
                        className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="flex-1 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
                      >
                        Review Order
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Review Step */}
              {currentStep === "review" && (
                <div className="bg-white rounded-lg p-6 md:p-8">
                  <h2 className="font-serif text-2xl font-bold mb-6">Review Your Order</h2>

                  <div className="space-y-8">
                    {/* Shipping Information */}
                    <div className="border-b border-gray-200 pb-8">
                      <h3 className="font-semibold mb-4">Shipping Information</h3>
                      <p className="text-gray-700">
                        {shippingInfo.firstName} {shippingInfo.lastName}
                      </p>
                      <p className="text-gray-700">{shippingInfo.address}</p>
                      <p className="text-gray-700">
                        {shippingInfo.city}, {shippingInfo.country} {shippingInfo.postalCode}
                      </p>
                      <button
                        onClick={() => setCurrentStep("shipping")}
                        className="mt-4 text-primary hover:text-primary-dark text-sm font-semibold"
                      >
                        Edit
                      </button>
                    </div>

                    {/* Order Items */}
                    <div className="border-b border-gray-200 pb-8">
                      <h3 className="font-semibold mb-4">Order Items</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">Wireless Bluetooth Headphones x 1</span>
                          <span className="font-semibold">$79.99</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700">Smartwatch with Heart Monitor x 2</span>
                          <span className="font-semibold">$399.98</span>
                        </div>
                      </div>
                    </div>

                    {/* Terms Checkbox */}
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="w-4 h-4 rounded" required />I have read and agree to the website{" "}
                      <Link href="/terms" className="text-primary hover:text-primary-dark">
                        terms and conditions
                      </Link>
                    </label>

                    <div className="flex gap-4">
                      <button
                        onClick={() => setCurrentStep("payment")}
                        className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 transition-colors"
                      >
                        Back
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors">
                        <Lock className="w-5 h-5" />
                        Place Order
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div>
              <div className="bg-white rounded-lg p-6 sticky top-24">
                <h3 className="font-serif text-xl font-bold mb-6">Your Order</h3>

                <div className="space-y-4 mb-6 border-b border-gray-200 pb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-semibold">${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-semibold">${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between mb-6">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-lg text-primary">${orderTotal.toFixed(2)}</span>
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
