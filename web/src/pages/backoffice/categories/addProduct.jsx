/* eslint-disable max-lines-per-function */
import Layout from "@/components/Layout"
import { useAddProductForm } from "@/pages/backoffice/products/forms/useAddProductForm"

function AddProduct() {
  const formik = useAddProductForm()

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-center my-6">
        Ajouter un nouveau produit
      </h1>
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
        <label className="block mb-6">
          <span className="text-gray-700">Nom du produit:</span>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            {...formik.getFieldProps("name")}
            required
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="text-red-500 text-sm">{formik.errors.name}</div>
          ) : null}
        </label>
        <label className="block mb-6">
          <span className="text-gray-700">Prix:</span>
          <input
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            {...formik.getFieldProps("price")}
            required
          />
          {formik.touched.price && formik.errors.price ? (
            <div className="text-red-500 text-sm">{formik.errors.price}</div>
          ) : null}
        </label>
        <label className="block mb-6">
          <span className="text-gray-700">Id de la catégorie :</span>
          <input
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            {...formik.getFieldProps("categoryId")}
            required
          />
          {formik.touched.categoryId && formik.errors.categoryId ? (
            <div className="text-red-500 text-sm">
              {formik.errors.categoryId}
            </div>
          ) : null}
        </label>
        <label className="block mb-6">
          <span className="text-gray-700">Description:</span>
          <textarea
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            rows="3"
            {...formik.getFieldProps("description")}
          ></textarea>
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

export default AddProduct
