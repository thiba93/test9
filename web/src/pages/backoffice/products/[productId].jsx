/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable line-comment-position */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-inline-comments */
import Layout from "@/components/Layout"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const DetailProduct = () => {
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

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-center my-6">
        View detail Product
      </h1>
      <label className="block mb-6">
        <span className="text-gray-700">Product Name:</span>
        <input
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          value={product.name}
          readOnly={true}
        />
      </label>
      <label className="block mb-6">
        <span className="text-gray-700">Price:</span>
        <input
          type="number"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          value={product.price}
          readOnly={true}
        />
      </label>
      <label className="block mb-6">
        <span className="text-gray-700">Description:</span>
        <textarea
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          rows="3"
          value={product.description}
          readOnly={true}
        ></textarea>
      </label>
      <Link href={`/backoffice`} style={{ marginRight: "10px" }}>
        Retour
      </Link>
    </Layout>
  )
}

export default DetailProduct
