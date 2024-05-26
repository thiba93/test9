import { prisma } from "@/back/db"

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const messages = await prisma.contactMessage.findMany()
      res.status(200).json(messages)
    } catch (error) {
      res.status(500).json({ error: "Error fetching messages" })
    }
  } else {
    res.setHeader("Allow", ["GET"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
