const { PrismaClient } = require("@prisma/client")
const { faker } = require("@faker-js/faker")
const prisma = new PrismaClient()

async function main() {
  await prisma.product.deleteMany({})
  await prisma.category.deleteMany({})

  const amountOfCategories = 10
  const categories = []

  for (let i = 0; i < amountOfCategories; i += 1) {
    const category = {
      displayName: faker.commerce.department(),
      uniqueSlug: faker.lorem.slug(),
      displayRank: faker.number.int({ min: 1, max: 100 }),
    }
    categories.push(category)
  }

   await prisma.category.createMany({
    data: categories,
    skipDuplicates: true,
  })
  const amountOfProducts = 50
  const products = []

  for (let i = 0; i < amountOfProducts; i+=1) {
    const product = {
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.number.int({ min: 1, max: 1000 }),
      image: faker.image.url(640, 480, "furniture", true),
      categoryId: faker.number.int({ min: 1, max: amountOfCategories }),
    }
    products.push(product)
  }

  const addProducts = async () => {
    await prisma.product.createMany({ data: products })
  }

  await addProducts()
}

main()
  .catch(() => {
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
