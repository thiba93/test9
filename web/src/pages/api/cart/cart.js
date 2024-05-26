import { PrismaClient } from "@prisma/client"
import jwt from "jsonwebtoken"
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
const handlePostRequest = async (req, res) => {
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

    return res.status(200).json(updatedCart)
  } catch (error) {
    toast.error("Error adding product to cart:", error.message)

    
return res.status(500).json({ error: "Internal server error", message: error.message })
  }
}
const handleGetRequest = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]

    if (!token) {
      return res.status(401).json({ error: "Authentication required" })
    }

    toast.log("Received token:", token)

    const decodedToken = jwt.verify(token, "your_secret_key")

    toast.log("Decoded token:", decodedToken)

    const { userId } = decodedToken
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

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" })
    }

    const cartData = {
      items: cart.items.map(item => ({
        id: item.id,
        name: item.product.name,
        description: item.product.description,
        price: item.price,
        quantity: item.quantity,
      })),
      total: cart.items.reduce((total, item) => total + item.price * item.quantity, 0),
    }

    return res.status(200).json(cartData)
  } catch (error) {
    toast.error("Error fetching cart data:", error)

    
return res.status(500).json({ error: "Internal server error", message: error.message })
  }
}

export default function handler(req, res) {
  if (req.method === "POST") {
    return handlePostRequest(req, res)
  } else if (req.method === "GET") {
    return handleGetRequest(req, res)
  }

  res.setHeader("Allow", ["POST", "GET"])

  
return res.status(405).end(`Method ${req.method} Not Allowed`)
}
