/* eslint-disable max-lines-per-function */
import Layout from "@/components/Layout"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useRouter } from "next/router"
import { toast } from "sonner"

const UpdateInfo = () => {
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "Le nom d'utilisateur doit comporter au moins 3 caractères")
        .required("Le nom d'utilisateur est obligatoire"),
      password: Yup.string()
        .min(6, "Le mot de passe doit comporter au moins 6 caractères")
        .required("Le mot de passe est obligatoire"),
      confirmPassword: Yup.string()
        .oneOf(
          [Yup.ref("password"), null],
          "Les mots de passe doivent correspondre",
        )
        .required("La confirmation du mot de passe est obligatoire"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch("/api/user/update", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        })

        if (response.ok) {
          toast.success("Informations mises à jour avec succès")
          router.push("/")
        } else {
          toast.error("Échec de la mise à jour des informations")
        }
      } catch (error) {
        toast.error("Erreur lors de la mise à jour des informations")
      }
    },
  })

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-center my-6">
        Mettre à jour les informations
      </h1>
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg"
      >
        <div className="mb-4">
            <label className="block text-gray-700">Nom d&apos;utilisateur:</label>
            <input
                type="text"
                {...formik.getFieldProps("username")}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
            {formik.touched.username && formik.errors.username ? (
                <div className="text-red-500 text-sm">{formik.errors.username}</div>
            ) : null}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Mot de passe:</label>
          <input
            type="password"
            {...formik.getFieldProps("password")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            Confirmer le mot de passe:
          </label>
          <input
            type="password"
            {...formik.getFieldProps("confirmPassword")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div className="text-red-500 text-sm">
              {formik.errors.confirmPassword}
            </div>
          ) : null}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Mettre à jour
        </button>
      </form>
    </Layout>
  )
}

export default UpdateInfo
