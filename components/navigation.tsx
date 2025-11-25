"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { UserButton, useAuth } from "@clerk/nextjs"
import { ShoppingCart, Search, Menu, X } from "lucide-react"

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()
  const { isSignedIn } = useAuth()

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-border z-50">
      <div className="container-responsive">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-primary font-serif text-xl font-semibold">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">◀</span>
            </div>
            Peak Commerce
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/shop" className="text-gray-700 hover:text-primary transition-colors">
              Shop
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary transition-colors">
              Contact
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <button
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors hidden sm:block"
              onClick={() => router.push("/search")}
            >
              <Search className="w-5 h-5 text-muted-foreground" />
            </button>

            <button
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
              onClick={() => router.push("/cart")}
            >
              <ShoppingCart className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-primary text-primary-foreground text-xs flex items-center justify-center rounded-full font-bold">
                0
              </span>
            </button>

            {isSignedIn ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <Link
                href="/sign-in"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity hidden sm:block font-medium"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-border">
            <Link href="/shop" className="block py-2 text-gray-700 hover:text-primary">
              Shop
            </Link>
            <Link href="/about" className="block py-2 text-gray-700 hover:text-primary">
              About
            </Link>
            <Link href="/contact" className="block py-2 text-gray-700 hover:text-primary">
              Contact
            </Link>
            {!isSignedIn && (
              <Link
                href="/sign-in"
                className="block mt-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-center font-medium"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
