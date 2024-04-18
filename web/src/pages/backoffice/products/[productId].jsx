/* eslint-disable max-lines-per-function */
import Layout from "@/components/Layout"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const DetailProduct = () => {
  const {
    query: { productId },
  } = useRouter()
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
  })
  const router = useRouter()

  useEffect(() => {
    if (productId) {
      const fetchProduct = async () => {
        try {
          const res = await fetch(`/api/products/${productId}`)
          const data = await res.json()
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
    }
  }, [productId])

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-center my-6">
        View Product Detail
      </h1>
      <div className="max-w-md mx-auto">
        <div>
          <span className="text-gray-700">Product Name:</span>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            value={product.name}
            readOnly
          />
        </div>
        <div>
          <span className="text-gray-700">Price:</span>
          <input
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            value={product.price}
            readOnly
          />
        </div>
        <div>
          <span className="text-gray-700">Description:</span>
          <textarea
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            rows="3"
            value={product.description}
            readOnly
          />
        </div>
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

export default DetailProduct
