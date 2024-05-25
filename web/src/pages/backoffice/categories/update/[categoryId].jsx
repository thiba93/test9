/* eslint-disable max-lines-per-function */
import Layout from "@/components/Layout"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useUpdateCategoryForm } from "@/pages/backoffice/categories/forms/useUpdateCategoryForm"
import { toast } from "sonner"
import axios from "axios"

const UpdatePage = () => {
  const router = useRouter()
  const { categoryId } = router.query
  const [category, setCategory] = useState({
    displayName: "",
    uniqueSlug: "",
    displayRank: "",
  })

  useEffect(() => {
    if (categoryId) {
      const fetchCategory = async () => {
        try {
          const response = await axios.get(`/api/categories/${categoryId}`)
          setCategory({
            displayName: response.data.displayName || "",
            uniqueSlug: response.data.uniqueSlug || "",
            displayRank: response.data.displayRank || "",
          })
        } catch (error) {
          const errorMsg = error.response
            ? error.response.statusText
            : error.message
          toast.error(`Failed to get category: ${errorMsg}`)
        }
      }
      fetchCategory()
    }
  }, [categoryId])

  const saveCategory = async (values) => {
    try {
      await axios.patch(`/api/categories/${categoryId}`, values, {
        headers: { "Content-Type": "application/json" },
      })
      router.push("/backoffice/categories")
    } catch (error) {
      const errorMsg = error.response
        ? error.response.statusText
        : error.message
      toast.error(`Failed to update category: ${errorMsg}`)
    }
  }
  const formik = useUpdateCategoryForm(category, saveCategory)

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-center my-6">
        Modifier catégorie
      </h1>
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
        <div className="space-y-6">
          <label className="block">
            <span className="text-gray-700">Nom:</span>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              {...formik.getFieldProps("displayName")}
            />
            {formik.touched.displayName && formik.errors.displayName && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.displayName}
              </p>
            )}
          </label>
          <label className="block">
            <span className="text-gray-700">Identifiant:</span>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              {...formik.getFieldProps("uniqueSlug")}
            />
            {formik.touched.uniqueSlug && formik.errors.uniqueSlug && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.uniqueSlug}
              </p>
            )}
          </label>
          <label className="block">
            <span className="text-gray-700">N° Affichage:</span>
            <input
              type="number"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              {...formik.getFieldProps("displayRank")}
            />
            {formik.touched.displayRank && formik.errors.displayRank && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.displayRank}
              </p>
            )}
          </label>
          <button
            type="submit"
            className="bg-primary-blue hover:bg-secondary-blue text-white font-bold py-2 px-4 rounded w-full"
          >
            Modifier
          </button>
        </div>
        <button
          onClick={() => router.push("/backoffice/categories")}
          className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Retour
        </button>
      </form>
    </Layout>
  )
}

export default UpdatePage
