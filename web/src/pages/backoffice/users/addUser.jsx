/* eslint-disable max-lines-per-function */
import Layout from "@/components/Layout"
import { useAddUserForm } from "@/pages/backoffice/users/forms/useAddUserForm"

function AddUser() {
  const formik = useAddUserForm()

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-center my-6">
        Ajouter un nouveau utilisateur
      </h1>
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
        <label className="block mb-6">
          <span className="text-gray-700">E-mail</span>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            {...formik.getFieldProps("email")}
            required
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          ) : null}
        </label>
        <label className="block mb-6">
          <span className="text-gray-700">Pseudo</span>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            {...formik.getFieldProps("username")}
            required
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="text-red-500 text-sm">{formik.errors.username}</div>
          ) : null}
        </label>
        <label className="block mb-6">
          <span className="text-gray-700">Mot de passe</span>
          <input
            type="password"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            {...formik.getFieldProps("password")}
            required
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
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

export default AddUser
