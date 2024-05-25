import React, { useContext } from "react"
import { CartContext } from "./api/cart/cartContext"
import Layout from "@/components/Layout"

const Cart = () => {
  const { cart } = useContext(CartContext)

  return (
    <Layout>
      <div>
      <h1
          style={{
            marginTop: "20px",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "24px",
          }}
        >
          Panier
        </h1>
        {cart.items.length === 0 ? (
          <p>Votre panier est vide.</p>
        ) : (
          <div>
            {cart.items.map(item => (
              <div key={item.id}>
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
            ))}
            <h3>Total: ${cart.total}</h3>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Cart
