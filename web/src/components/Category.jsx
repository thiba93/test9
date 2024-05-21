/* eslint-disable max-lines-per-function */
import React, { useState, useEffect } from "react"
import Image from "next/image"
import { toast } from "sonner"
import Link from "next/link"

const Category = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("api/categories")

        if (!response.ok) {
          throw new Error("Network response was not ok.")
        }

        const contentType = response.headers.get("content-type")

        if (!contentType || !contentType.includes("application/json")) {
          throw new TypeError("Oops, we haven't got JSON!")
        }

        const data = await response.json()
        const sortedCategories = data
          .sort((a, b) => a.displayRank - b.displayRank)
          .slice(0, 3)
        setCategories(sortedCategories)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error fetching categories:", error)
        toast(`Error fetching categories: ${error.message}`)
      }
    }

    fetchCategories()
  }, [])

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "1rem",
        marginTop: "2rem",
        backgroundColor: "#FBF9F1",
        padding: "1rem",
        borderRadius: "8px",
      }}
    >
      {categories.map((category, index) => (
        <div
          key={index}
          style={{
            position: "relative",
            marginBottom: "20px",
            backgroundColor: "#AAD7D9",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Link
            key={category.id}
            href={`/category/${category.id}/products`}
            legacyBehavior
          >
            <a style={{ textDecoration: "none" }}>
              <Image
                src="https://media.istockphoto.com/id/1266344041/fr/photo/rendu-3d-de-la-table-%C3%A0-manger-de-planche-de-bord-rugueux.jpg?s=1024x1024&w=is&k=20&c=7dQshXAOs3_feA5vqJ8DoHq6-lA7RL8XZkul-zKHzuw="
                alt={category.displayName}
                width="300"
                height="400"
                objectFit="cover"
              />
              <p
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "white",
                  fontSize: "20px",
                  fontWeight: "bold",
                  textAlign: "center",
                  width: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  padding: "0.5rem",
                }}
              >
                {category.displayName}
              </p>
            </a>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default Category
