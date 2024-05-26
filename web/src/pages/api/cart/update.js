import { PrismaClient } from "@prisma/client"
import { toast } from "sonner"

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { userId, productId, quantity } = req.body

    try {
      if (!userId || !productId || !quantity) {
        throw new Error("Missing required fields")
      }

      const cartItem = await prisma.cartItem.findFirst({
        where: {
          cart: {
            userId,
          },
          productId,
        },
      })

      if (!cartItem) {
        throw new Error("Cart item not found")
      }

      await prisma.cartItem.update({
        where: {
          id: cartItem.id,
        },
        data: {
          quantity,
        },
      })

      const updatedCart = await prisma.cart.findUnique({
        where: { userId },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      })

      res.status(200).json(updatedCart)
    } catch (error) {
      toast.error("Error updating product quantity:", error.message) 
      res.status(500).json({ error: "Internal server error", message: error.message }) 
    }
  } else {
    res.setHeader("Allow", ["POST"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
