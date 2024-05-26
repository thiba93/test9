import { PrismaClient } from "@prisma/client"
import { toast } from "sonner"

const prisma = new PrismaClient()
const validateInputs = ({ userId, productId, quantity }) => {
  if (!userId || !productId || !quantity) {
    throw new Error("Missing required fields")
  }
}
const findProduct = async (productId) => {
  const product = await prisma.product.findUnique({
    where: { id: productId },
  })

  if (!product) {
    throw new Error("Product not found")
  }

  return product
}
const findOrCreateCart = async (userId, product) => {
  let cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: true,
    },
  })

  cart ||= await prisma.cart.create({
      data: {
        userId,
        items: {
          create: {
            productId: product.id,
            name: product.name,
            description: product.description,
            quantity: 1,
            price: product.price,
          },
        },
      },
      include: {
        items: true,
      },
    })

  return cart
}
const updateCartItem = async (cart, product, quantity) => {
  const existingItem = cart.items.find(item => item.productId === product.id)

  if (existingItem) {
    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + quantity },
    })
  } else {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId: product.id,
        name: product.name,
        description: product.description,
        quantity,
        price: product.price,
      },
    })
  }
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { userId, productId, quantity } = req.body

    try {
      validateInputs({ userId, productId, quantity })

      const product = await findProduct(productId)
      const cart = await findOrCreateCart(userId, product)

      await updateCartItem(cart, product, quantity)

      const updatedCart = await prisma.cart.findUnique({
        where: { userId },
        include: {
          items: true,
        },
      })

      res.status(200).json(updatedCart)
    } catch (error) {
      toast.error("Error adding product to cart:", error.message)
      res.status(500).json({ error: "Internal server error", message: error.message })
    }
  } else {
    res.setHeader("Allow", ["POST"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
