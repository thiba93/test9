import React, { useContext } from "react"
import { CartContext } from "@/pages/api/cart/cartContext"
import Layout from "@/components/Layout"
import Image from "next/image"

const CartPage = () => {
  const { cart } = useContext(CartContext)
  const calculateTotal = () => cart.items.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Panier</h1>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            {cart.items.map(item => (
              <div key={item.id} className="flex items-center mb-4 border-b pb-4">
                <Image src={item.image} alt={item.name} width={100} height={100} className="mr-4"/>
                <div className="flex-1">
                  <h2 className="text-xl font-bold">{item.name}</h2>
                  <p>{item.description}</p>
                </div>
                <div className="flex items-center">
                  <p className="text-lg font-bold">{item.price}€</p>
                  <input type="number" value={item.quantity} readOnly className="ml-4 w-12 text-center border rounded"/>
                  <button className="ml-4 text-red-600 hover:text-red-800">🗑️</button>
                </div>
              </div>
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
      </div>
    </Layout>
  )
}

export default CartPage
