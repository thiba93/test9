import React from "react"

const CartItem = ({ item, handleQuantityChange, handleRemove }) => (
  <div className="flex items-center mb-4 border-b pb-4">
    <div className="flex-1">
      <h2 className="text-xl font-bold">{item.name}</h2>
      <p>{item.description}</p>
    </div>
    <div className="flex items-center">
      <p className="text-lg font-bold">{item.price}€</p>
      <input 
        type="number" 
        value={item.quantity} 
        min="1"
        onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value, 10))}
        className="ml-4 w-12 text-center border rounded"
      />
      <button 
        onClick={() => handleRemove(item.productId)} 
        className="ml-4 text-red-600 hover:text-red-800"
      >
        🗑️
      </button>
    </div>
  </div>
)

export default CartItem
