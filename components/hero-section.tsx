"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="pt-24 pb-12 md:pt-32 md:pb-20 bg-gradient-to-br from-primary via-[oklch(0.55_0.14_260)] to-[oklch(0.65_0.1_260)] text-white">
      <div className="container-responsive text-center">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
          Elevate Your Tech Experience
        </h1>
        <p className="text-base md:text-lg text-white/90 mb-8 max-w-2xl mx-auto text-pretty">
          Discover premium electronics designed for seamless living and unparalleled performance.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Explore Our Products
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  )
}
