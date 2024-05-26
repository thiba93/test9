import React, { useEffect, useState } from "react"
import axios from "axios"
import Layout from "@/components/Layout"
import { toast } from "sonner"
import Link from "next/link"

const CategoriesPage = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/categories")
        setCategories(response.data)
      } catch (error) {
        toast("Failed to fetch categories:", error)
      }
    }

    fetchCategories()
  }, [])

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Toutes les Catégories</h1>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.id}/products`}
              legacyBehavior
            >
              <li
                key={category.id}
                className="bg-white shadow-md rounded-lg p-4"
              >
                {category.displayName}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </Layout>
  )
}

export default CategoriesPage
