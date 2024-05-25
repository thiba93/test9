import { useFormik } from "formik"
import * as Yup from "yup"
import { useRouter } from "next/router"
import { toast } from "sonner"
import { emailValidator, passwordValidator } from "@/utils/validators"

export const useAddUserForm = () => {
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
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
    onSubmit: async (values) => {
      try {
        await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        })
        router.push("/backoffice/users")
      } catch (error) {
        toast.error("Failed to add user:", error)
      }
    },
  })

  return formik
}
