import { PrismaClient } from "@prisma/client"
import { toast } from "sonner"

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { userId, productId } = req.body

    try {
      const cart = await prisma.cart.findUnique({
        where: { userId },
        include: { items: true },
      })

      if (!cart) {
        return res.status(404).json({ error: "Cart not found" })
      }

      const cartItem = cart.items.find(item => item.productId === productId)

      if (!cartItem) {
        return res.status(404).json({ error: "Item not found in cart" })
      }

      await prisma.cartItem.delete({
        where: { id: cartItem.id },
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

      return res.status(200).json(updatedCart)
    } catch (error) {
      toast.error("Error removing item from cart:", error.message)

      
return res.status(500).json({ error: "Internal server error", message: error.message })
    }
  } else {
    res.setHeader("Allow", ["POST"])

    
return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
