import { prisma } from "@/back/db"

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const categories = await prisma.category.findMany()
      res.status(200).json(categories)
    } catch (error) {
      res.status(500).json({ error: "Error fetching categories" })
    }
  } else {
    // Handles any requests that aren't GET
    res.setHeader("Allow", ["GET"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
