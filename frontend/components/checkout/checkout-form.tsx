// components/checkout/checkout-form.tsx
"use client"

import { useState } from "react"
import FormInput from "@/components/ui/form-input"
import { validateCheckoutForm, type CheckoutFormData } from "@/lib/validation"
import { AlertCircle } from "lucide-react"

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormData) => void
  isLoading: boolean
  initialData?: Partial<CheckoutFormData>
}

export default function CheckoutForm({
  onSubmit,
  isLoading,
  initialData,
}: CheckoutFormProps) {
  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: initialData?.firstName || "",
    lastName: initialData?.lastName || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    address: initialData?.address || "",
    city: initialData?.city || "",
    postalCode: initialData?.postalCode || "",
    country: initialData?.country || "Zimbabwe",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name } = e.target
    setTouched(prev => ({
      ...prev,
      [name]: true,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate all fields
    const validation = validateCheckoutForm(formData)

    if (!validation.isValid) {
      setErrors(validation.errors)
      // Mark all fields as touched to show errors
      const allTouched: Record<string, boolean> = {}
      Object.keys(formData).forEach(key => {
        allTouched[key] = true
      })
      setTouched(allTouched)
      return
    }

    // All valid, submit
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg p-4 sm:p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>

        {/* Name Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <FormInput
            label="First Name"
            name="firstName"
            required
            value={formData.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.firstName ? errors.firstName : undefined}
            disabled={isLoading}
          />
          <FormInput
            label="Last Name"
            name="lastName"
            required
            value={formData.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.lastName ? errors.lastName : undefined}
            disabled={isLoading}
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <FormInput
            label="Email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email ? errors.email : undefined}
            disabled={isLoading}
            helpText="We'll send your order confirmation here"
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <FormInput
            label="Phone Number"
            name="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.phone ? errors.phone : undefined}
            disabled={isLoading}
            helpText="Include country code (e.g., +263701234567 or 0701234567)"
          />
        </div>

        {/* Address */}
        <div className="mb-4">
          <FormInput
            label="Street Address"
            name="address"
            required
            value={formData.address}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.address ? errors.address : undefined}
            disabled={isLoading}
          />
        </div>

        {/* City and Postal Code */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <FormInput
            label="City"
            name="city"
            required
            value={formData.city}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.city ? errors.city : undefined}
            disabled={isLoading}
          />
          <FormInput
            label="Postal Code"
            name="postalCode"
            required
            value={formData.postalCode}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.postalCode ? errors.postalCode : undefined}
            disabled={isLoading}
          />
        </div>

        {/* Country (Read-only for Zimbabwe) */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country <span className="text-red-600">*</span>
          </label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            disabled
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
          >
            <option value="Zimbabwe">Zimbabwe</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">Only shipping to Zimbabwe is available</p>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {isLoading ? "Processing..." : "Continue to Payment"}
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
