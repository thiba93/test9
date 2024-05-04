import React, { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/router"
import Layout from "@/components/Layout"
import Image from "next/image"

const ProductDetails = ({ product }) => (
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
  </div>
)
const ProductPage = () => {
  const router = useRouter()
  const { categoryId, productId } = router.query
  const [product, setProduct] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    axios
      .get(`/api/categories/${categoryId}/product/${productId}`)
      .then((response) => {
        setProduct(response.data)
      })
      .catch(() => {
        setError("Failed to fetch product details")
      })
  }, [categoryId, productId])

  if (error) {
    return (
      <Layout>
        <div className="text-center text-red-500">{error}</div>
      </Layout>
    )
  }

  if (!product) {
    return (
      <Layout>
        <div className="text-center">Loading...</div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <ProductDetails product={product} />
      </div>
    </Layout>
  )
}

export default ProductPage
