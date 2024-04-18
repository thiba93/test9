/* eslint-disable max-lines-per-function */
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
        //Console.error("Failed to get product:", error)
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

      await response.json()
      //Console.log("Product updated successfully:", updatedProduct)
      //Alert("Product updated successfully!")
      router.push("/backoffice")
    } catch (error) {
      //Console.error("Failed to update product:", error)
      //Alert("Failed to update product")
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
          className="bg-primary-blue hover:bg-secondary-blue text-black font-bold py-2 px-4 rounded"
        >
          Modifier
        </button>
      </form>
      <div className="max-w-md mx-auto">
        <button
          onClick={() => router.push("/backoffice")}
          className="bg-primary-blue hover:bg-secondary-blue text-black font-bold py-2 px-4 rounded"
        >
          Retour
        </button>
      </div>
    </Layout>
  )
}

export default UpdatePage
