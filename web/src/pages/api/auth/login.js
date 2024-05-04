/* eslint-disable consistent-return */
import { prisma } from "@/back/db"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { email, password } = req.body

  try {
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" })
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" })
    res.status(200).json({ message: "Login successful", user, token })

    res.status(200).json({ message: "Login successful", user })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
