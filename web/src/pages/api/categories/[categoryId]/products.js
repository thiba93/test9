import { prisma } from "@/back/db"

export default async function handler(req, res) {
  const { categoryId } = req.query

  if (req.method === "GET") {
    try {
      const products = await prisma.product.findMany({
        where: { categoryId: Number(categoryId) }
      })
      res.status(200).json(products)
    } catch (error) {
      res.status(500).json({ error: "Error fetching products" })
    }
  } else {
    res.setHeader("Allow", ["GET"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
