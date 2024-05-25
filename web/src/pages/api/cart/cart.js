/* eslint-disable no-console */
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const userId = "some-user-id" 
      const cart = await prisma.cart.findUnique({
        where: { userId },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      })
      const cartData = {
        items: cart.items.map(item => ({
          id: item.id,
          name: item.product.name,
          description: item.product.description,
          price: item.product.price,
          quantity: item.quantity,
        })),
        total: cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0),
      }

      res.status(200).json(cartData)
    } catch (error) {
      console.error("Error fetching cart data:", error)
      res.status(500).json({ error: "Internal server error" })
    }
  } else {
    res.setHeader("Allow", ["GET"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
