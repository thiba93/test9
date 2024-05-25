import { useFormik } from "formik"
import * as Yup from "yup"
import { useRouter } from "next/router"
import { emailValidator, passwordValidator } from "@/utils/validators"

export function useUpdateUserForm(user, saveUser) {
  const router = useRouter()
  const { userId } = router.query
  const formik = useFormik({
    initialValues: {
      username: user.username,
      email: user.email,
      password: user.password,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      email: emailValidator.required("Le mail est obligatoire").label("E-mail"),
      password: passwordValidator
        .required("Le mot de passe est obligatoire")
        .label("Password"),
      username: Yup.string()
        .min(3, "Le nom doit comporter au moins 3 caractères")
        .matches(
          /^[a-zA-Z0-9 ]*$/u,
          "Le nom ne doit pas contenir de caractères spéciaux",
        )
        .required("Le pseudo est obligatoire"),
    }),
    onSubmit: (values) => {
      saveUser(values, userId)
    },
  })

  return formik
}
