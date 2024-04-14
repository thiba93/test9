import Layout from "@/components/Layout"
import { useEffect, useState } from "react"

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
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>${product.price}</p>
          <p>{product.description}</p>
        </div>
      ))}
    </Layout>
  )
}

export default Products
