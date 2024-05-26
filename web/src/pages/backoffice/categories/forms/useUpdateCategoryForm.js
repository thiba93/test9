import { useFormik } from "formik"
import * as Yup from "yup"
import { useRouter } from "next/router"

export function useUpdateCategoryForm(category, saveCategory) {
  const router = useRouter()
  const { categoryId } = router.query
  const formik = useFormik({
    initialValues: {
      displayName: category.displayName,
      uniqueSlug: category.uniqueSlug,
      displayRank: category.displayRank,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      displayName: Yup.string()
        .min(3, "Le nom doit comporter au moins 3 caractères")
        .required("Le nom est obligatoire"),
      uniqueSlug: Yup.string()
        .min(3, "L'identifiant doit comporter au moins 3 caractères")
        .required("L'identifiant est obligatoire"),
      displayRank: Yup.number()
        .positive("L'id doit être un nombre positif")
        .required("L'id est obligatoire"),
    }),
    onSubmit: (values) => {
      saveCategory(values, categoryId)
    },
  })

  return formik
}
