import { useFormik } from "formik"
import * as Yup from "yup"
import { useRouter } from "next/router"
import { toast } from "sonner"

export const useAddCategoryForm = () => {
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      displayName: "",
      uniqueSlug: "",
      displayRank: "",
    },
    validationSchema: Yup.object({
      displayName: Yup.string()
        .min(3, "Le nom doit comporter au moins 3 caractères")
        .required("Le nom est obligatoire"),
      uniqueSlug: Yup.string()
        .min(3, "L'identifiant doit comporter au moins 3 caractères")
        .required("L'identifiant est obligatoire"),
      displayRank: Yup.number()
        .positive("L'affichage doit être un nombre positif")
        .required("L'affichage est obligatoire"),
    }),
    onSubmit: async (values) => {
      try {
        await fetch("/api/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        })
        router.push("/backoffice/categories")
      } catch (error) {
        toast.error("Failed to add category:", error)
      }
    },
  })

  return formik
}
