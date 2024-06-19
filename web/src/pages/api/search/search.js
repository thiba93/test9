/* eslint-disable consistent-return */
/* eslint-disable max-depth */
/* eslint-disable max-lines-per-function */
import { PrismaClient } from "@prisma/client"
import { toast } from "sonner"

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { query, minPrice, maxPrice, category, sortBy } = req.query

    try {
      const filters = {
        AND: [],
      }

      if (query) {
        filters.AND.push({
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } }
          ]
        })
      }

      if (minPrice) {
        filters.AND.push({
          price: { gte: parseFloat(minPrice) },
        })
      }

      if (maxPrice) {
        filters.AND.push({
          price: { lte: parseFloat(maxPrice) },
        })
      }

      if (category) {
        const categoryObj = await prisma.category.findUnique({
          where: { displayName: category },
        })

        if (categoryObj) {
          filters.AND.push({
            categoryId: categoryObj.id,
          })
        } else {
          // If the category does not exist, return an empty result
          return res.status(200).json([])
        }
      }

      // Fetch all products that match other filters
      const products = await prisma.product.findMany({
        where: filters,
        include: { category: true },
      })

      toast(`Fetched ${products.length} products`)

      // Sort by price if sortBy is specified
      if (sortBy) {
        products.sort((a, b) =>
          sortBy === "asc" ? a.price - b.price : b.price - a.price
        )
      }

      res.status(200).json(products)
    } catch (error) {
      toast.error(`Error: ${error.message}`)
      res.status(500).json({ error: "Internal server error", message: error.message })
    }
  } else {
    res.setHeader("Allow", ["GET"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
