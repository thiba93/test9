/* eslint-disable no-empty-function */
/* eslint-disable max-lines-per-function */
import React, { createContext, useState, useEffect } from "react"
import axios from "axios"
import { jwtDecode } from "jwt-decode"
import { toast } from "sonner"

export const CartContext = createContext({
  cart: { items: [], total: 0 },
  setCart: () => {},
  addToCart: () => {},
  updateQuantity: () => {},
  removeFromCart: () => {},
  successMessage: "",
  setSuccessMessage: () => {}
})
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], total: 0 })
  const [successMessage, setSuccessMessage] = useState("")

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token") 

        if (!token) {
          throw new Error("User not authenticated")
        }

        const response = await axios.get("/api/cart/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setCart(response.data)
      } catch (error) {
        toast.error("Error fetching cart data:", error.message) 
      }
    }

    fetchCart()
  }, [])

  const addToCart = async (productId, quantity) => {
    try {
      const token = localStorage.getItem("token") 

      if (!token) {
        throw new Error("User not authenticated")
      }

      const decodedToken = jwtDecode(token)
      const {userId} = decodedToken 
      const productResponse = await axios.get(`/api/products/${productId}`)
      const product = productResponse.data
      const response = await axios.post("/api/cart/add", {
        userId,
        productId,
        quantity,
        price: product.price,
        name: product.name,
        description: product.description,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setCart(response.data)
      setSuccessMessage("Votre produit a été ajoutée avec succès")
      setTimeout(() => setSuccessMessage(""), 3000)
    } catch (error) {
      toast.error("Error adding product to cart:", error.message) 
    }
  }
  const updateQuantity = async (productId, quantity) => {
    try {
      const token = localStorage.getItem("token") 

      if (!token) {
        throw new Error("User not authenticated")
      }

      const decodedToken = jwtDecode(token)
      const {userId} = decodedToken 
      const response = await axios.post("/api/cart/update", {
        userId,
        productId,
        quantity,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setCart(response.data)
    } catch (error) {
      toast.error("Error updating product quantity:", error.message) 
    }
  }
  const removeFromCart = async (productId) => {
    try {
      const token = localStorage.getItem("token")

      if (!token) {
        throw new Error("User not authenticated")
      }

      const decodedToken = jwtDecode(token)
      const {userId} = decodedToken 
      const response = await axios.post("/api/cart/remove", { userId, productId }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setCart(response.data)
    } catch (error) {
      toast.error("Error removing product from cart:", error.message) 
    }
  }

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart,updateQuantity, removeFromCart, successMessage }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
