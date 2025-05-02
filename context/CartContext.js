// CartContext.js
'use client'
import { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const clearCart = () => setCart([])

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      setCart(JSON.parse(storedCart))
    }
  }, [])

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])


  const addToCart = (product) => {
    setCart(prev => {
      const existingItemIndex = prev.findIndex(item => item.id === product.id)

      if (existingItemIndex !== -1) {
        // Update quantity only
        const updatedCart = [...prev]
        const existingItem = updatedCart[existingItemIndex]

        updatedCart[existingItemIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + product.quantity
        }

        return updatedCart
      }

      // New item
      return [...prev, { ...product, quantity: product.quantity }]
    })
  }

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
