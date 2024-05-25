/* eslint-disable no-empty-function */
/* eslint-disable no-console */
import React, { createContext, useState, useEffect } from "react"
import axios from "axios"

export const CartContext = createContext({
  cart: { items: [], total: 0 },
  setCart: () => {},
})
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], total: 0 })

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("/api/cart")
        setCart(response.data)
      } catch (error) {
        console.error("Error fetching cart data:", error)
      }
    }

    fetchCart()
  }, [])

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
