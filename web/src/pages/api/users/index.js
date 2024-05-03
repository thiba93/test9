import bcrypt from "bcrypt"
import { prisma } from "@/back/db"

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    try {
      const user = await prisma.user.create({
        data: { username, email, password: hashedPassword },
      })
      res.status(201).json(user)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  } else if (req.method === "GET") {
    try {
      const users = await prisma.user.findMany()
      res.status(200).json(users)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}
