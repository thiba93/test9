import * as React from "react"
import { useRouter } from "next/router"
import Layout from "@/components/Layout"

const AdminDashboard = () => {
  const router = useRouter()
  const handleNavigation = (path) => {
    router.push(path)
  }

  return (
    <Layout>
      <div className="flex flex-col items-center p-4">
        <h1 className="text-3xl font-bold mb-6">Backoffice administrateur</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => handleNavigation("/backoffice/users")}
            className="bg-primary-blue hover:bg-secondary-blue text-black font-bold py-2 px-4 rounded"
          >
            Utilisateurs
          </button>
          <button
            onClick={() => handleNavigation("/backoffice/categories")}
            className="bg-primary-blue hover:bg-secondary-blue text-black font-bold py-2 px-4 rounded"
          >
            Categories
          </button>
          <button
            onClick={() => handleNavigation("/backoffice/orders")}
            className="bg-primary-blue hover:bg-secondary-blue text-black font-bold py-2 px-4 rounded"
          >
            Commandes
          </button>
          <button
            onClick={() => handleNavigation("/backoffice/products")}
            className="bg-primary-blue hover:bg-secondary-blue text-black font-bold py-2 px-4 rounded"
          >
            Produits
          </button>
        </div>
      </div>
    </Layout>
  )
}

export default AdminDashboard
