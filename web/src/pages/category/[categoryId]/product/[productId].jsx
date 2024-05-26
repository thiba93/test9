import React, { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/router"
import Layout from "@/components/Layout"
import ProductDetails from "@/components/ProductDetail"

const ProductPage = () => {
  const router = useRouter()
  const { categoryId, productId } = router.query
  const [product, setProduct] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (categoryId && productId) {
      axios
        .get(`/api/categories/${categoryId}/product/${productId}`)
        .then((response) => {
          setProduct(response.data)
        })
        .catch(() => {
          setError("Failed to fetch product details")
        })
    }
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
        <div className="text-center">Chargement...</div>
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
