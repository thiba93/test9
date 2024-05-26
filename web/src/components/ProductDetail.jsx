import React, { useContext } from "react"
import Image from "next/image"
import { CartContext } from "@/pages/api/cart/cartContext"

const ProductDetails = ({ product }) => {
  const { addToCart, successMessage } = useContext(CartContext)
  const handleAddToCart = () => {
    addToCart(product.id, 1) 
  }

  return (
    <div className="p-4 shadow rounded-lg bg-white">
      <h2 className="text-xl font-bold">{product.name}</h2>
      <p>{product.description}</p>
      {product.imageUrl && (
        <Image
          src={product.imageUrl}
          alt={product.name}
          width="100"
          height="100"
          className="mt-2"
        />
      )}
      <p>Prix: {product.price}€</p>
      <button 
        onClick={handleAddToCart} 
        className="mt-4 bg-blue-500 text-white p-2 rounded"
      >
        Ajouter au panier
      </button>
      {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}
    </div>
  )
}

export default ProductDetails
