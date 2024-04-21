import { useFormik } from "formik"
import * as Yup from "yup"
import { useRouter } from "next/router"

export function useUpdateProductForm(product, saveProduct) {
  const router = useRouter()
  const { productId } = router.query
  const formik = useFormik({
    initialValues: {
      name: product.name,
      price: product.price,
      description: product.description,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Le nom doit comporter au moins 3 caractères")
        .matches(
          /^[a-zA-Z0-9 ]*$/u,
          "Le nom ne doit pas contenir de caractères spéciaux",
        )
        .required("Le nom du produit est obligatoire"),
      price: Yup.number()
        .positive("Le prix doit être un nombre positif")
        .required("Le prix est obligatoire"),
      description: Yup.string(),
    }),
    onSubmit: (values) => {
      saveProduct(values, productId)
    },
  })

  return formik
}
