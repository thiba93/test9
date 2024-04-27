import { useRouter } from "next/router"
import { emailValidator, usernameValidator, passwordValidator } from "@/utils/validators"
import Form from "@/components/ui/Form"
import FormField from "@/components/ui/FormField"
import SubmitButton from "@/components/ui/SubmitButton"
import Layout from "@/components/Layout"
import { Formik } from "formik"
import { object } from "yup"
import axios from "axios"

const initialValues = {
  email: "",
  password: "",
  username: "", 
}
const validationSchema = object({
  email: emailValidator.required().label("E-mail"),
  password: passwordValidator.required().label("Password"),
  username: usernameValidator.required().label("Username"), 
})
const SignUpPage = () => {
  const router = useRouter()
  const onSubmit = async (values, { setSubmitting, resetForm, setErrors }) => {
    try {
      await axios.post("/api/users", values)
      resetForm()
      router.push("/sign-in")
    } catch (error) {
      setErrors({ submit: error.response.data.error })
    }

    setSubmitting(false)
  }

  return (
    <Layout>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
        <h1 style={{ marginTop: "20px", textAlign: "center", fontWeight: "bold", fontSize: "24px" }}>Inscription</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {formikProps => (
            <Form>
              <FormField
                name="email"
                type="email"
                placeholder="Enter your e-mail"
                label="E-mail"
              />
              <FormField
                name="password"
                type="password"
                placeholder="Enter your password"
                label="Password"
              />
              <FormField
                name="username"
                type="text"
                placeholder="Choose a username"
                label="Username"
              />
              <SubmitButton disabled={formikProps.isSubmitting}>Sign Up</SubmitButton>
            </Form>
          )}
        </Formik>
      </div>
    </Layout>
  )
}

export default SignUpPage
