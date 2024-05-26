import { prisma } from "@/back/db"

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, subject, message } = req.body

    try {
      const contactMessage = await prisma.contactMessage.create({
        data: { email, subject, message },
      })
      res.status(201).json(contactMessage)
    } catch (error) {
      res.status(500).json({ error: "Error saving message" })
    }
  } else {
    res.setHeader("Allow", ["POST"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
