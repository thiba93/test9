import Layout from "@/components/Layout"
import { useState } from "react"

// eslint-disable-next-line max-lines-per-function
function AddProduct() {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()
    const numericPrice = parseFloat(price)

    if (isNaN(numericPrice)) {
      return
    }

    const product = { name, price: numericPrice, description }
    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    })

    // Optionally, clear the form or redirect the user
    // setName("");
    // setPrice("");
    // setDescription("");
    // Redirect example (if using Next.js Router for SPA behavior)
    // router.push('/products'); // import useRouter from 'next/router' at the top
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-center my-6">
        Ajouter un nouveau produit
      </h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <label className="block mb-6">
          <span className="text-gray-700">Nom du produit:</span>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label className="block mb-6">
          <span className="text-gray-700">Prix:</span>
          <input
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <label className="block mb-6">
          <span className="text-gray-700">Description:</span>
          <textarea
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </label>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Ajouter
        </button>
      </form>
    </Layout>
  )
}

export default AddProduct
