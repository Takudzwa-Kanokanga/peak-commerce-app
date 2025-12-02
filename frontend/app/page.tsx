import Navigation from "@/components/navigation"
import HeroSection from "@/components/hero-section"
import FeaturedProducts from "@/components/featured-products"
import Testimonials from "@/components/testimonials"
import CTASection from "@/components/cta-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <FeaturedProducts />
      <Testimonials />
      <CTASection />
      <Footer />
    </main>
  )
}
