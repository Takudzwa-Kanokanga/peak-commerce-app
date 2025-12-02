import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { ArrowRight, Zap, Shield, Users } from "lucide-react"
import Link from "next/link"

export default function About() {
  return (
    <main className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-light to-white pt-32 pb-16">
        <div className="container-responsive">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-primary mb-6">
              About Peak Commerce
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              We're building the future of e-commerce by combining cutting-edge technology with exceptional customer experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 border-b border-border">
        <div className="container-responsive">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-serif font-bold text-primary mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Peak Commerce is dedicated to revolutionizing online shopping. We believe that every customer deserves a seamless, secure, and enjoyable shopping experience.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Our platform brings together innovative technology, curated products, and dedicated customer service to create an unparalleled e-commerce destination.
              </p>
              <Link 
                href="/shop" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors"
              >
                Start Shopping <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center h-48">
                <p className="text-center text-gray-600 font-semibold">Innovation First</p>
              </div>
              <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center h-48">
                <p className="text-center text-gray-600 font-semibold">Customer Focused</p>
              </div>
              <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center h-48">
                <p className="text-center text-gray-600 font-semibold">Secure & Trusted</p>
              </div>
              <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center h-48">
                <p className="text-center text-gray-600 font-semibold">Always Growing</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50 border-b border-border">
        <div className="container-responsive">
          <h2 className="text-4xl font-serif font-bold text-primary mb-12 text-center">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="bg-white p-8 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-primary mb-3">
                Innovation
              </h3>
              <p className="text-gray-700">
                We continuously invest in technology and new features to stay ahead of the curve and provide the best shopping experience.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-white p-8 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-primary mb-3">
                Trust & Security
              </h3>
              <p className="text-gray-700">
                Your security and privacy are paramount. We use industry-leading encryption and security practices to protect your data.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-white p-8 rounded-lg border border-border hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-primary mb-3">
                Community
              </h3>
              <p className="text-gray-700">
                We build lasting relationships with our customers and believe in creating a community around Peak Commerce.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container-responsive text-center">
          <h2 className="text-4xl font-serif font-bold mb-6">
            Ready to Experience Peak Commerce?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers enjoying the best online shopping experience.
          </p>
          <Link 
            href="/shop" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Explore Our Shop <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
