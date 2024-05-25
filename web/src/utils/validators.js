import { number, string } from "yup"

export const emailValidator = string().email("L'email n'est pas valide.")

export const passwordValidator = string()
  .min(8, "Le mot de passe doit faire 8 caractères minimum.")
  .matches(
    /(?=.*\p{Lu})(?=.*\p{Ll})(?=.*\d)(?=.*[^\d\p{L}]).*/u,
    "Doit contenir 1 miniscule, 1 majuscule, 1 chiffre et 1 caractères spécial.",
  )

export const usernameValidator = string().min(
  3,
  "Votre pseudo doit faire 3 caractères minimum",
)

export const idValidator = number().min(1)
