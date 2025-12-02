"use client"

import Image from "next/image"
import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah L.",
    role: "Tech Enthusiast",
    rating: 5,
    quote:
      "Peak Commerce transformed my tech experience. The quality is exceptional and customer service is outstanding.",
    image: "/diverse-woman-avatar.png",
  },
  {
    id: 2,
    name: "John M.",
    role: "Professional",
    rating: 5,
    quote: "The smartwatch is exactly what I needed. Excellent craftsmanship and fast shipping!",
    image: "/man-avatar.png",
  },
  {
    id: 3,
    name: "Emma K.",
    role: "Student",
    rating: 5,
    quote: "Affordable premium quality. Love the products and the seamless checkout experience.",
    image: "/professional-woman-avatar.png",
  },
]

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-responsive">
        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-12 text-center">What Our Customers Say</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
              <div className="flex items-center gap-3">
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
