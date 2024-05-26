/* eslint-disable consistent-return */
import { prisma } from "@/back/db"

export default async function handler(req, res) {
  const { categoryId } = req.query

  if (req.method === "GET") {
    try {
      const category = await prisma.category.findUnique({
        where: { id: parseInt(categoryId, 10) },
      })

      if (!category) {
        return res.status(404).json({ error: "Category not found" })
      }

      res.status(200).json(category)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  } else if (req.method === "PATCH") {
    const { displayName, uniqueSlug, displayRank } = req.body

    try {
      const updatedCategory = await prisma.category.update({
        where: { id: parseInt(categoryId, 10) },
        data: { displayName, uniqueSlug, displayRank },
      })
      res.status(200).json(updatedCategory)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  } else if (req.method === "DELETE") {
    try {
      await prisma.category.delete({
        where: { id: parseInt(categoryId, 10) },
      })
      res.status(204).send()
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  } else {
    res.setHeader("Allow", ["GET", "PATCH", "DELETE"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
