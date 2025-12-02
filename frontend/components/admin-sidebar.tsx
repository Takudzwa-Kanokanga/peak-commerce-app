"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, ShoppingCart, Package, Users, Settings, LogOut } from "lucide-react"
import { SignOutButton } from "@clerk/nextjs"
import { useState } from "react"

const menuItems = [
  { icon: BarChart3, label: "Dashboard", href: "/admin" },
  { icon: ShoppingCart, label: "Orders", href: "/admin/orders" },
  { icon: Package, label: "Products", href: "/admin/products" },
  { icon: Users, label: "Customers", href: "/admin/customers" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <aside className={`bg-gray-800 text-white transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"}`}>
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">◀</span>
          </div>
          {!isCollapsed && <span className="font-serif font-bold">Peak Admin</span>}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive ? "bg-primary text-white" : "text-gray-300 hover:bg-gray-700"
              }`}
              title={isCollapsed ? item.label : ""}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <span className="text-lg">←→</span>
          {!isCollapsed && <span className="text-sm">Collapse</span>}
        </button>
        <SignOutButton>
          <button className="w-full mt-2 flex items-center gap-3 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-gray-700 rounded-lg transition-colors">
            <LogOut className="w-5 h-5" />
            {!isCollapsed && <span>Logout</span>}
          </button>
        </SignOutButton>
      </div>
    </aside>
  )
}
