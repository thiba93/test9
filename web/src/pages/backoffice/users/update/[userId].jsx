/* eslint-disable max-lines-per-function */
import Layout from "@/components/Layout"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useUpdateUserForm } from "@/pages/backoffice/users/forms/useUpdateUserForm"
import { toast } from "sonner"
import axios from "axios"

const UpdatePage = () => {
  const router = useRouter()
  const { userId } = router.query
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  })

  useEffect(() => {
    if (userId) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`/api/users/${userId}`)
          setUser({
            username: response.data.username || "",
            email: response.data.email || "",
          })
        } catch (error) {
          const errorMsg = error.response
            ? error.response.statusText
            : error.message
          toast.error(`Failed to get product: ${errorMsg}`)
        }
      }
      fetchProduct()
    }
  }, [userId])

  const saveUser = async (values) => {
    try {
      await axios.patch(`/api/users/${userId}`, values, {
        headers: { "Content-Type": "application/json" },
      })
      router.push("/backoffice/users")
    } catch (error) {
      const errorMsg = error.response
        ? error.response.statusText
        : error.message
      toast.error(`Failed to update user: ${errorMsg}`)
    }
  }
  const formik = useUpdateUserForm(user, saveUser)

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-center my-6">
        Modifier utilisateur
      </h1>
      <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
        <div className="space-y-6">
          <label className="block">
            <span className="text-gray-700">Email:</span>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
            )}
          </label>
          <label className="block">
            <span className="text-gray-700">Pseudo:</span>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              {...formik.getFieldProps("username")}
            />
            {formik.touched.username && formik.errors.username && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.username}
              </p>
            )}
          </label>
          <label className="block">
            <span className="text-gray-700">Mot de passe:</span>
            <input
              type="password"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.password}
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
          onClick={() => router.push("/backoffice")}
          className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Retour
        </button>
      </form>
    </Layout>
  )
}

export default UpdatePage
