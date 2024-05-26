import { prisma } from "@/back/db"

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const categories = await prisma.category.findMany()
      res.status(200).json(categories)
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error fetching categories", details: error.message })
    }
  } else if (req.method === "POST") {
    const { displayName, uniqueSlug, displayRank } = req.body

    try {
      const category = await prisma.category.create({
        data: { displayName, uniqueSlug, displayRank },
      })
      res.status(201).json(category)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}
