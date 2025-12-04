// components/checkout/payment-form.tsx
"use client"

import { useState } from "react"
import { validatePaymentForm, formatCardNumber, formatExpiryDate, type PaymentFormData } from "@/lib/validation"
import { CreditCard, AlertCircle, Lock } from "lucide-react"

interface PaymentFormProps {
  onSubmit: (data: PaymentFormData, method: string) => void
  isLoading: boolean
  initialMethod?: string
}

export default function PaymentForm({
  onSubmit,
  isLoading,
  initialMethod = "stripe",
}: PaymentFormProps) {
  const [paymentMethod, setPaymentMethod] = useState(initialMethod)
  const [formData, setFormData] = useState<PaymentFormData>({
    cardHolder: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "")
    if (value.length > 19) value = value.slice(0, 19)
    
    setFormData(prev => ({
      ...prev,
      cardNumber: formatCardNumber(value),
    }))
    
    if (errors.cardNumber) {
      setErrors(prev => ({
        ...prev,
        cardNumber: "",
      }))
    }
  }

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "")
    if (value.length > 4) value = value.slice(0, 4)
    
    setFormData(prev => ({
      ...prev,
      expiryDate: formatExpiryDate(value),
    }))
    
    if (errors.expiryDate) {
      setErrors(prev => ({
        ...prev,
        expiryDate: "",
      }))
    }
  }

  const handleCVVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "")
    if (value.length > 4) value = value.slice(0, 4)
    
    setFormData(prev => ({
      ...prev,
      cvv: value,
    }))
    
    if (errors.cvv) {
      setErrors(prev => ({
        ...prev,
        cvv: "",
      }))
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target
    setTouched(prev => ({
      ...prev,
      [name]: true,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (paymentMethod === "stripe") {
      const validation = validatePaymentForm(formData)
      if (!validation.isValid) {
        setErrors(validation.errors)
        const allTouched: Record<string, boolean> = {}
        Object.keys(formData).forEach(key => {
          allTouched[key] = true
        })
        setTouched(allTouched)
        return
      }
    }

    onSubmit(formData, paymentMethod)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg p-4 sm:p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-6">Payment Method</h2>

        {/* Payment Method Selection */}
        <div className="space-y-3 mb-6">
          {/* Stripe */}
          <label className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition">
            <input
              type="radio"
              name="method"
              value="stripe"
              checked={paymentMethod === "stripe"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              disabled={isLoading}
              className="mt-1"
            />
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Credit/Debit Card</p>
              <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                <Lock className="w-3 h-3" />
                Secure payment via Stripe
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Test card: 4242 4242 4242 4242 | Any future date | Any CVC
              </p>
            </div>
          </label>

          {/* Bank Transfer */}
          <label className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition">
            <input
              type="radio"
              name="method"
              value="bank_transfer"
              checked={paymentMethod === "bank_transfer"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              disabled={isLoading}
              className="mt-1"
            />
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Direct Bank Transfer</p>
              <p className="text-sm text-gray-600">For Zimbabwean customers</p>
              <p className="text-xs text-gray-500 mt-2">
                Bank details will be provided after order confirmation
              </p>
            </div>
          </label>
        </div>

        {/* Card Details Form (only for Stripe) */}
        {paymentMethod === "stripe" && (
          <div className="space-y-4 pt-6 border-t border-gray-200">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Card Details
            </h3>

            {/* Card Holder */}
            <div>
              <label htmlFor="cardHolder" className="block text-sm font-medium text-gray-700 mb-2">
                Card Holder Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="cardHolder"
                name="cardHolder"
                value={formData.cardHolder}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="John Doe"
                disabled={isLoading}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition ${
                  touched.cardHolder && errors.cardHolder
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-primary"
                }`}
              />
              {touched.cardHolder && errors.cardHolder && (
                <p className="text-xs text-red-600 mt-1">{errors.cardHolder}</p>
              )}
            </div>

            {/* Card Number */}
            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Card Number <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleCardNumberChange}
                onBlur={handleBlur}
                placeholder="4242 4242 4242 4242"
                disabled={isLoading}
                maxLength={19}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition font-mono ${
                  touched.cardNumber && errors.cardNumber
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-primary"
                }`}
              />
              {touched.cardNumber && errors.cardNumber && (
                <p className="text-xs text-red-600 mt-1">{errors.cardNumber}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">Test: 4242 4242 4242 4242</p>
            </div>

            {/* Expiry and CVV */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleExpiryChange}
                  onBlur={handleBlur}
                  placeholder="MM/YY"
                  disabled={isLoading}
                  maxLength={5}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition font-mono ${
                    touched.expiryDate && errors.expiryDate
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-primary"
                  }`}
                />
                {touched.expiryDate && errors.expiryDate && (
                  <p className="text-xs text-red-600 mt-1">{errors.expiryDate}</p>
                )}
              </div>

              <div>
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">
                  CVV <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleCVVChange}
                  onBlur={handleBlur}
                  placeholder="123"
                  disabled={isLoading}
                  maxLength={4}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition font-mono ${
                    touched.cvv && errors.cvv
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-primary"
                  }`}
                />
                {touched.cvv && errors.cvv && (
                  <p className="text-xs text-red-600 mt-1">{errors.cvv}</p>
                )}
              </div>
            </div>

            {/* Security Info */}
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg flex gap-3">
              <Lock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-blue-700">
                Your payment information is secured and encrypted. We use Stripe to securely process payments.
              </p>
            </div>
          </div>
        )}

        {/* Bank Transfer Info */}
        {paymentMethod === "bank_transfer" && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg flex gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800">
              After placing your order, you'll receive an email with bank transfer details. Please complete the payment within 24 hours to confirm your order.
            </p>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {isLoading ? "Processing..." : "Review Order"}
      </button>

      {/* Validation Summary */}
      {Object.keys(errors).length > 0 && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-red-900 text-sm mb-2">Please fix the following errors:</p>
            <ul className="space-y-1">
              {Object.entries(errors).map(([field, error]) => (
                <li key={field} className="text-sm text-red-700">
                  • {error}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </form>
  )
}
