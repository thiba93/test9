/* eslint-disable consistent-return */
import { prisma } from "@/back/db"

export default async function handler(req, res) {
  const { userId } = req.query

  if (req.method === "GET") {
    // Handle GET request - Fetch a single user by ID
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      })

      if (!user) {
        return res.status(404).json({ error: "User not found" })
      }

      res.status(200).json(user)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  } else if (req.method === "PATCH") {
    // Handle PATCH request - Update a user by ID
    const { email, username, password } = req.body

    try {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { email, username, password },
      })
      res.status(200).json(updatedUser)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  } else if (req.method === "DELETE") {
    // Handle DELETE request - Delete a user by ID
    try {
      await prisma.user.delete({
        where: { id: userId },
      })
      res.status(204).send()
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  } else {
    // Method Not Allowed
    res.setHeader("Allow", ["GET", "PATCH", "DELETE"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
