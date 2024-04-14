import Layout from "@/components/Layout"
import { useEffect, useState } from "react"
import Link from "next/link"

function Products() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/products")
      const data = await res.json()
      setProducts(data)
    }
    fetchData()
  }, [])

  return (
    <Layout>
      <div className="p-5">
        <h1 className="text-3xl font-bold text-center mb-10">
          Liste des produits
        </h1>
        <div className="flex justify-end mb-6">
          <Link href="backoffice/products/addProduct">Ajouter un produit</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out"
            >
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-lg text-gray-800 mt-2">${product.price}</p>
              <p className="text-gray-600 mt-2">{product.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Products
