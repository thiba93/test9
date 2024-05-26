import { number, string, object } from "yup"

export const emailValidator = string().email()

export const passwordValidator = string()
  .min(8)
  .matches(
    /(?=.*\p{Lu})(?=.*\p{Ll})(?=.*\d)(?=.*[^\d\p{L}]).*/u,
    "Doit contenir 1 miniscule, 1 majuscule, 1 chiffre et 1 caractères spécial.",
  )

export const usernameValidator = string().min(
  3,
  "Votre pseudo doit faire 3 caractères minimum",
)

export const idValidator = number().min(1)

export const subjectValidator = string()
.email("Invalid email address")
.required("Required")

export const messageValidator = string()
  .required("Required")
  .max(500, "Message cannot be longer than 500 characters")

  export const contactValidationSchema = object({
    email: emailValidator,
    subject: subjectValidator,
    message: messageValidator,
  })