import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(req, res) {
  const { id } = req.query

  if (req.method === "PATCH") {
    const { name, price, description } = req.body

    try {
      const product = await prisma.product.update({
        where: { id: parseInt(id, 10) },
        data: { name, price, description },
      })
      res.status(200).json(product)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  if (req.method === "DELETE") {
    try {
      await prisma.product.delete({
        where: { id: parseInt(id, 10) },
      })
      res.status(204).send()
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}
