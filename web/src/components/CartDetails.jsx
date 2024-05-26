import React, { useContext } from "react"
import { CartContext } from "@/pages/api/cart/cartContext"
import CartItem from "./CartItem"

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, successMessage } = useContext(CartContext)
  const calculateTotal = () => cart.items.reduce((total, item) => total + item.price * item.quantity, 0)
  const handleRemove = (productId) => {
    removeFromCart(productId)
  }
  const handleQuantityChange = (productId, quantity) => {
    if (quantity > 0) {
      updateQuantity(productId, quantity)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Panier</h1>
      {successMessage && <p className="text-green-500 text-center">{successMessage}</p>}
      {cart.items.length === 0 ? (
        <p className="text-center">Votre panier est vide.</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            {cart.items.map(item => (
              <CartItem 
                key={item.id} 
                item={item} 
                handleQuantityChange={handleQuantityChange} 
                handleRemove={handleRemove} 
              />
            ))}
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Total</h2>
            <div className="flex justify-between mb-2">
              <span className="text-lg">TOTAL</span>
              <span className="text-lg font-bold">{calculateTotal()} €</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-lg">TVA</span>
              <span className="text-lg font-bold">{(calculateTotal() * 0.2).toFixed(2)} €</span>
            </div>
            <button className="w-full bg-blue-500 text-white py-2 rounded-lg">PASSER LA COMMANDE</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
