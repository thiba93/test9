import React, { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/router"
import Layout from "@/components/Layout"

// Component to display each product
import Image from "next/image"

const Product = ({ product }) => (
  <div>
    <h2>{product.name}</h2>
    <p>{product.description}</p>
    <Image
      src={
        "https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcRifpBsS3fGJgO70OE7vGwLDt7IIKF02wVju8PwaNJXyxoadWRS4rDhgqvEVXBkj-IkllRN6RDByQp49zM"
      }
      alt={product.name}
      width="100"
      height="100"
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
      <div>
        <h1>Products in Category</h1>
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    )
  }

  if (!products.length) {
    return <div>Loading...</div>
  }

  return (
    <Layout>
      <div>
        <h1>Products in Category</h1>
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </Layout>
  )
}

export default CategoryProducts
