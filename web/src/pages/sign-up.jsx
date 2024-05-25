/* eslint-disable max-lines-per-function */
import Link from "next/link"
import { useRouter } from "next/router"
import {
  emailValidator,
  usernameValidator,
  passwordValidator,
} from "@/utils/validators"
import Form from "@/components/ui/Form"
import FormField from "@/components/ui/FormField"
import SubmitButton from "@/components/ui/SubmitButton"
import Layout from "@/components/Layout"
import { Formik } from "formik"
import { object } from "yup"
import axios from "axios"
import { toast } from "sonner"

const initialValues = {
  email: "",
  password: "",
  username: "",
}
const validationSchema = object({
  email: emailValidator.required("L'email est requis").label("E-mail"),
  password: passwordValidator
    .required("Le mot de passe est requis")
    .label("Mot de passe"),
  username: usernameValidator.required("Le pseudo est requis").label("Pseudo"),
})
const SignUpPage = () => {
  const router = useRouter()
  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await axios.post("/api/users", values)
      router.push("/sign-in")
    } catch (error) {
      setErrors({ submit: error.response.data.error })
      toast.error("Erreur lors de l'inscription. Email déjà utilisé.")
    }

    setSubmitting(false)
  }

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <h1
          style={{
            marginTop: "20px",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "24px",
          }}
        >
          Inscription
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formikProps) => (
            <Form>
              <FormField
                name="email"
                type="email"
                placeholder="Entrez votre e-mail"
                label="E-mail"
              />
              <FormField
                name="password"
                type="password"
                placeholder="Entrez votre mot de passe"
                label="Mot de passe"
              />
              <FormField
                name="username"
                type="text"
                placeholder="Choisir un pseudo"
                label="Pseudo"
              />
              <Link href="/sign-in" legacyBehavior>
                <a className="font-semibold">
                  Vous avez déjà un compte ? Cliquez ici
                </a>
              </Link>
              <SubmitButton disabled={formikProps.isSubmitting}>
                Inscription
              </SubmitButton>
            </Form>
          )}
        </Formik>
      </div>
    </Layout>
  )
}

export default SignUpPage
