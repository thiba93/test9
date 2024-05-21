import React, { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/router"
import Layout from "@/components/Layout"
import Image from "next/image"
import Link from "next/link"

const Product = ({ product }) => (
  <div className="bg-fbf9f1 p-5 rounded-lg shadow-lg">
    <h2 className="text-2xl text-92c7cf font-semibold">{product.name}</h2>
    <p className="text-e5e1da">{product.description}</p>
    <Image
      src="/meuble1.jpg"
      alt={product.name}
      width={100}
      height={100}
      className="m-auto"
    />
  </div>
)
const CategoryProducts = () => {
  const router = useRouter()
  const { categoryId } = router.query
  const [products, setProducts] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    axios
      .get(`/api/categories/${categoryId}/products`)
      .then((response) => setProducts(response.data))
      .catch((e) => setError(e))
  }, [categoryId])

  if (error) {
    return (
      <div className="bg-aad7d9 text-center p-5">
        <h1 className="text-3xl text-e5e1da">Erreur chargement produits</h1>
      </div>
    )
  }

  if (!products.length) {
    return (
      <div className="bg-fbf9f1 text-center p-5 text-lg">Chargement...</div>
    )
  }

  return (
    <Layout>
      <div className="bg-aad7d9 p-5">
        <h1 className="text-3xl text-e5e1da font-bold mb-5">
          Produit par catégorie
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/category/${categoryId}/product/${product.id}`}
              passHref
            >
              <Product key={product.id} product={product} />
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default CategoryProducts
