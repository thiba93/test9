import { prisma } from "@/back/db"

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, price, description, categoryId } = req.body

    try {
      const product = await prisma.product.create({
        data: {
          name,
          price,
          description,
          category: {
            connect: { id: categoryId },
          },
        },
      })
      res.status(201).json(product)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  if (req.method === "GET") {
    try {
      const products = await prisma.product.findMany()
      res.status(200).json(products)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}
