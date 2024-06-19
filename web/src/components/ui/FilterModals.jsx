/* eslint-disable max-lines-per-function */
import React from "react"
import Modal from "react-modal"

const FiltersModal = ({ 
  isOpen, 
  onRequestClose, 
  minPrice, 
  setMinPrice, 
  maxPrice, 
  setMaxPrice, 
  category, 
  setCategory, 
  categories, 
  sortBy, 
  setSortBy 
}) => {
  const handleReset = () => {
    setMinPrice("")
    setMaxPrice("")
    setCategory("")
    setSortBy("")
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Filters Modal"
      className="modal"
      overlayClassName="overlay"
    >
      <h2 className="text-xl font-bold mb-4">Filtres</h2>
      <div className="mb-4">
        <label className="block mb-2">Prix min:</label>
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="p-2 border rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Prix max:</label>
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="p-2 border rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Catégories:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded w-full"
        >
          <option value="">Sélectionner des catégories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.displayName}>
              {cat.displayName}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Trier par prix:</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 border rounded w-full"
        >
          <option value="">None</option>
          <option value="asc">Croissant</option>
          <option value="desc">Décroissant</option>
        </select>
      </div>
      <div className="flex justify-between">
        <button onClick={onRequestClose} className="bg-blue-500 text-white p-2 rounded">
          Appliquer
        </button>
        <button onClick={handleReset} className="bg-red-500 text-white p-2 rounded">
          Réinitialiser
        </button>
      </div>
    </Modal>
  )
}

export default FiltersModal
