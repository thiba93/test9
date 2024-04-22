import { number, string } from "yup"

export const emailValidator = string().email()

export const passwordValidator = string()
  .min(8)
  .matches(
    /(?=.*\p{Lu})(?=.*\p{Ll})(?=.*\d)(?=.*[^\d\p{L}]).*/u,
    "Must contain: 1 lower & 1 upper letters, 1 digit and 1 spe. char.",
  )

export const usernameValidator = string().min(3, "Your fullname must be at least 3 characters long")

export const idValidator = number().min(1)