import { prisma } from "@/back/db"

export default async function handler(req, res) {
  const { email } = req.query

  if (req.method === "GET") {
    try {
      const messages = await prisma.contactMessage.findMany({
        where: { email },
      })
      res.status(200).json(messages)
    } catch (error) {
      res.status(500).json({ error: "Error fetching user messages" })
    }
  } else {
    res.setHeader("Allow", ["GET"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
