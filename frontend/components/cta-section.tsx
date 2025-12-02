"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-gray-900 text-white">
      <div className="container-responsive text-center">
        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">Ready for More?</h2>
        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
          Dive into our extensive catalog and find exactly what you need.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
        >
          Explore All Products
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  )
}
