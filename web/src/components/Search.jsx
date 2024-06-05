/* eslint-disable max-lines-per-function */
import React, { useState, useEffect } from "react"
import axios from "axios"
import { toast } from "sonner"
import { useRouter } from "next/router"
import FiltersModal from "./ui/FilterModals"

const Search = () => {
  const [query, setQuery] = useState("")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [category, setCategory] = useState("")
  const [categories, setCategories] = useState([])
  const [sortBy, setSortBy] = useState("")
  const [results, setResults] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const router = useRouter()

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
  const handleProductClick = (categoryId, productId) => {
    router.push(`/category/${categoryId}/product/${productId}`)
  }
  const openModal = () => {
    setIsModalOpen(true)
  }
  const closeModal = () => {
    setIsModalOpen(false)
    handleSearch() 
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Rechercher</h1>
      <div className="flex justify-center mb-8">
        <button onClick={openModal} className="bg-blue-500 text-white p-2 rounded mr-2">
          Filtres
        </button>
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
          Rechercher
        </button>
      </div>
      <FiltersModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        category={category}
        setCategory={setCategory}
        categories={categories}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="col-span-1">
          {/* Remove the filters from here, since they're now in the modal */}
        </div>
        <div className="col-span-3">
          <h2 className="text-xl font-bold mb-4">Résultats</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((product) => (
              <div
                key={product.id}
                className="border p-4 rounded cursor-pointer"
                onClick={() => handleProductClick(product.category.id, product.id)}
              >
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
