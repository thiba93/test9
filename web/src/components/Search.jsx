/* eslint-disable max-lines-per-function */
import React, { useState, useEffect } from "react"
import axios from "axios"
import { toast } from "sonner"

const Search = () => {
  const [query, setQuery] = useState("")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [category, setCategory] = useState("")
  const [categories, setCategories] = useState([])
  const [sortBy, setSortBy] = useState("")
  const [results, setResults] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/categories")
        setCategories(response.data)
      } catch (error) {
        toast.error("Error fetching categories:", error.message)
      }
    }

    fetchCategories()
  }, [])

  const handleSearch = async () => {
    try {
      const response = await axios.get("/api/search/search", {
        params: {
          query,
          minPrice,
          maxPrice,
          category,
          sortBy,
        },
      })
      setResults(response.data)
    } catch (error) {
      toast.error("Error searching products:", error.message)
      toast.error(`Error searching products: ${error.message}`, error)
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Rechercher</h1>
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 border rounded w-2/3"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white p-2 rounded ml-2"
        >
          Search
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="col-span-1">
          <div className="mb-4">
            <label className="block mb-2">Min Price:</label>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="p-2 border rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Max Price:</label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="p-2 border rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-2 border rounded w-full"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.displayName}>
                  {cat.displayName}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Sort By Price:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-2 border rounded w-full"
            >
              <option value="">None</option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
        <div className="col-span-3">
          <h2 className="text-xl font-bold mb-4">Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((product) => (
              <div key={product.id} className="border p-4 rounded">
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p>{product.description}</p>
                <p>Price: {product.price}€</p>
                <p>Category: {product.category.displayName}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search
