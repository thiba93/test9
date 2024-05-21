/* eslint-disable max-lines-per-function */
import Link from "next/link"
import { useRouter } from "next/router"
import { Formik } from "formik"
import { object } from "yup"
import axios from "axios"
import Layout from "@/components/Layout"
import Form from "@/components/ui/Form"
import FormField from "@/components/ui/FormField"
import SubmitButton from "@/components/ui/SubmitButton"
import { emailValidator, passwordValidator } from "@/utils/validators"

const initialValues = {
  email: "",
  password: "",
}
const validationSchema = object({
  email: emailValidator.required().label("E-mail"),
  password: passwordValidator.required().label("Password"),
})
const SignInPage = () => {
  const router = useRouter()
  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await axios.post("/api/auth/login", values)
      localStorage.setItem("token", response.data.token)
      router.push("/")
    } catch (error) {
      setErrors({ submit: error.response.data.error })
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
          Connexion
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
              {formikProps.errors.submit && (
                <div style={{ color: "red", marginTop: "10px" }}>
                  {formikProps.errors.submit}
                </div>
              )}
              <Link href="/sign-up" legacyBehavior>
                <a className="font-semibold">Pas de compte ? Cliquez ici</a>
              </Link>
              <SubmitButton disabled={formikProps.isSubmitting}>
                Connexion
              </SubmitButton>
            </Form>
          )}
        </Formik>
      </div>
    </Layout>
  )
}

export default SignInPage
