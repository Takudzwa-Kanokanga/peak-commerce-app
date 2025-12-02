// context/CartContext.tsx
"use client"

import React, { createContext, useContext, useState, useMemo, ReactNode, useEffect } from "react"

// Define the shape of a product in the cart
interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
  stock?: number
}

// Define the shape of the context
interface CartContextType {
  cart: CartItem[]
  addToCart: (product: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, newQuantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  isLoading: boolean
  error: string | null
}

// Create the context
const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = 'peak-commerce-cart'

// Provider component
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY)
      if (storedCart) {
        setCart(JSON.parse(storedCart))
      }
    } catch (err) {
      console.error('Failed to load cart from localStorage:', err)
      setError('Failed to load cart')
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
      } catch (err) {
        console.error('Failed to save cart to localStorage:', err)
        setError('Failed to save cart')
      }
    }
  }, [cart, isLoading])

  // Function to add a product to the cart (or increment quantity if it exists)
  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.id === product.id)
      
      if (existingItem) {
        // Check stock availability
        const maxQuantity = product.stock || Infinity
        const newQuantity = Math.min(existingItem.quantity + 1, maxQuantity)
        
        if (newQuantity > existingItem.quantity) {
          return currentCart.map(item => 
            item.id === product.id ? { ...item, quantity: newQuantity } : item
          )
        }
        setError('Not enough stock available')
        return currentCart
      } else {
        // Add new product with quantity 1
        return [...currentCart, { ...product, quantity: 1 }]
      }
    })
  }

  // Function to remove a product completely
  const removeFromCart = (productId: number) => {
    setCart(currentCart => currentCart.filter(item => item.id !== productId))
  }

  // Function to clear entire cart
  const clearCart = () => {
    setCart([])
  }

  // Function to update the quantity of a product
  const updateQuantity = (productId: number, newQuantity: number) => {
    setCart(currentCart => {
      if (newQuantity <= 0) {
        // If quantity is zero or less, remove the item
        return currentCart.filter(item => item.id !== productId)
      }
      
      // Check stock availability
      const item = currentCart.find(item => item.id === productId)
      if (item && item.stock && newQuantity > item.stock) {
        setError(`Cannot add more than ${item.stock} items. Only ${item.stock} in stock.`)
        return currentCart
      }
      
      return currentCart.map(item => 
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    })
  }

  // Calculate total number of items and total price
  const { totalItems, totalPrice } = useMemo(() => {
    const items = cart.reduce((sum, item) => sum + item.quantity, 0)
    const price = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    return { totalItems: items, totalPrice: price }
  }, [cart])

  const contextValue = useMemo(() => ({
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    updateQuantity,
    totalItems,
    totalPrice,
    isLoading,
    error,
  }), [cart, totalItems, totalPrice, isLoading, error])

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  )
}

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}