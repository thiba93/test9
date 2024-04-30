import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(req, res) {
  const { categoryId, productId } = req.query

  try {
    const product = await prisma.product.findUnique({
      where: {
        id: Number(productId), 
        categoryId: Number(categoryId) 
      }
    })

    if (product) {
      res.status(200).json(product)
    } else {
      res.status(404).json({ message: "Product not found" })
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  } finally {
    await prisma.$disconnect()
  }
}
