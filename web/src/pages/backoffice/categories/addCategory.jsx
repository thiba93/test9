/* eslint-disable max-lines-per-function */
import Layout from "@/components/Layout"
import { useAddCategoryForm } from "@/pages/backoffice/categories/forms/useAddCategoryForm"

function AddCategory() {
  const formik = useAddCategoryForm()

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-center my-6">
        Ajouter une nouvelle catégorie
      </h1>
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
        <label className="block mb-6">
          <span className="text-gray-700">Nom:</span>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            {...formik.getFieldProps("displayName")}
            required
          />
          {formik.touched.displayName && formik.errors.displayName ? (
            <div className="text-red-500 text-sm">
              {formik.errors.displayName}
            </div>
          ) : null}
        </label>
        <label className="block mb-6">
          <span className="text-gray-700">Identifiant:</span>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            {...formik.getFieldProps("uniqueSlug")}
            required
          />
          {formik.touched.uniqueSlug && formik.errors.uniqueSlug ? (
            <div className="text-red-500 text-sm">
              {formik.errors.uniqueSlug}
            </div>
          ) : null}
        </label>
        <label className="block mb-6">
          <span className="text-gray-700">N° Affichage</span>
          <input
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            {...formik.getFieldProps("displayRank")}
            required
          />
          {formik.touched.displayRank && formik.errors.displayRank ? (
            <div className="text-red-500 text-sm">
              {formik.errors.displayRank}
            </div>
          ) : null}
        </label>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Ajouter
        </button>
      </form>
    </Layout>
  )
}

export default AddCategory
