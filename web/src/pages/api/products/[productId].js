import { prisma } from "@/back/db"

export default async function handler(req, res) {
  const id = req.query.productId

  if (req.method === "PATCH") {
    const { name, price, description, categoryId } = req.body

    try {
      const product = await prisma.product.update({
        where: { id },
        data: { name, price, description, categoryId },
      })
      res.status(200).json(product)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  if (req.method === "DELETE") {
    try {
      await prisma.product.delete({
        where: { id },
      })

      res.status(204).send()
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  if (req.method === "GET") {
    try {
      const product = await prisma.product.findUnique({
        where: { id },
        include: {
          category: true,
        },
      })

      res.status(200).json(product)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}
