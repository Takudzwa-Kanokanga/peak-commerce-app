// components/navigation.tsx

"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth, SignOutButton } from "@clerk/nextjs"
import { Menu, X, ShoppingCart, User, LogOut } from "lucide-react"
import { useState } from "react"

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
            <Link href="/" className="text-gray-700 hover:text-primary transition-colors"> Home </Link> {/* ADDED HOME LINK */}
            <Link href="/shop" className="text-gray-700 hover:text-primary transition-colors"> Shop </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary transition-colors"> About </Link>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center gap-4">
            <Link href="/cart" className="relative p-2 text-gray-700 hover:text-primary transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {/* <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span> */}
            </Link>

            {isSignedIn ? (
              <Link href="/admin" className="p-2 text-gray-700 hover:text-primary transition-colors">
                <User className="w-6 h-6" />
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/sign-in" className="hidden lg:block text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                  Sign In
                </Link>
                <Link href="/sign-up" className="hidden lg:block px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors">
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="p-2 text-gray-700 hover:text-primary transition-colors md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-border shadow-lg p-6 space-y-4">
          <Link
            href="/" // ADDED HOME LINK
            className="block text-gray-700 hover:text-primary transition-colors py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/shop"
            className="block text-gray-700 hover:text-primary transition-colors py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Shop
          </Link>
          <Link
            href="/about"
            className="block text-gray-700 hover:text-primary transition-colors py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </Link>

          <div className="border-t pt-4 space-y-2">
            {!isSignedIn ? (
              <>
                <Link
                  href="/sign-in"
                  className="block text-sm font-medium text-gray-700 hover:text-primary transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="block w-full text-center px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <SignOutButton>
                <button
                  className="block w-full text-left text-sm font-medium text-red-600 hover:text-red-800 transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Out
                </button>
              </SignOutButton>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}