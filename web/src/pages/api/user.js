import { prisma } from "@/back/db"

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" })
    }

    try {
        const { userId } = req
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { username, password },
        })

        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
  } else {
    res.status(405).json({ error: "Method not allowed" })
  }
  
  return null
}
