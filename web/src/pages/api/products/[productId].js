/* eslint-disable require-unicode-regexp */
/* eslint-disable no-console */
/* eslint-disable object-shorthand */
import { prisma } from "@/back/db"

export default async function handler(req, res) {
  const id = req.query.productId
  console.log(req.method)

  if (req.method === "PATCH") {
    const { name, price, description } = req.body

    try {
      const product = await prisma.product.update({
        where: { id: id },
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
        where: { id: id },
      })

      res.status(204).send()
    } catch (error) {
      console.error("Failed to delete product:", error)
      res.status(500).json({ error: error.message })
    }
  }

  if (req.method === "GET") {
    try {
      console.log("id back", id)
      const product = await prisma.product.findUnique({
        where: { id },
      })

      res.status(200).json(product)
    } catch (error) {
      console.error("Failed to delete product:", error)
      res.status(500).json({ error: error.message })
    }
  }
}
