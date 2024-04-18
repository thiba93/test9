/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable line-comment-position */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-inline-comments */
import Layout from "@/components/Layout"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const UpdatePage = () => {
  const router = useRouter()
  const { productId } = router.query
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
  })

  useEffect(() => {
    if (!productId) {
      return
    }

    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${productId}`)
        const data = await response.json()
        setProduct({
          name: data.name || "",
          price: data.price || "",
          description: data.description || "",
        })
      } catch (error) {
        console.error("Failed to get product:", error)
      }
    }

    fetchProduct()
  }, [productId])

  const handleChange = (field) => (e) => {
    setProduct({
      ...product,
      [field]: e.target.value,
    })
  }
  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })

      if (!response.ok) {
        throw new Error("Failed to update product")
      }

      const updatedProduct = await response.json()
      console.log("Product updated successfully:", updatedProduct)
      alert("Product updated successfully!")
      router.push("/backoffice") // Assume this is the path to your products list
    } catch (error) {
      console.error("Failed to update product:", error)
      alert("Failed to update product")
    }
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-center my-6">Update Product</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <label className="block mb-6">
          <span className="text-gray-700">Product Name:</span>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={product.name}
            onChange={handleChange("name")}
            required
          />
        </label>
        <label className="block mb-6">
          <span className="text-gray-700">Price:</span>
          <input
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={product.price}
            onChange={handleChange("price")}
            required
          />
        </label>
        <label className="block mb-6">
          <span className="text-gray-700">Description:</span>
          <textarea
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            rows="3"
            value={product.description}
            onChange={handleChange("description")}
          ></textarea>
        </label>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Update
        </button>
      </form>
    </Layout>
  )
}

export default UpdatePage
