const { PrismaClient } = require("@prisma/client")
const { faker } = require("@faker-js/faker")
const prisma = new PrismaClient()

async function main() {
  await prisma.product.deleteMany({})

  const amountOfProducts = 50
  const products = []

  for (let i = 0; i < amountOfProducts; i += 1) {
    const product = {
      name: faker.commerce.productName(),
      price: faker.number.float({ min: 500, max: 5000 }),
      image:
        "https://t4.ftcdn.net/jpg/02/67/08/33/360_F_267083342_Dw7NvtP2oy0JfO2qTjDlWePOaxoCJgxM.jpg",
    }

    products.push(product)
  }

  const addProducts = async () =>
    await prisma.product.createMany({ data: products })

  addProducts()
}

main()
  .catch(() => {
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
