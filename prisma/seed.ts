import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const users = [
  {
    where: { email: "alice@prisma.io" },
    update: {},
    create: {
      email: "alice@prisma.io",
      name: "Alice",
      hashedPassword: "$2y$10$s@1tValue!sQW9.bZ.8.1234567890 ",
      posts: {
        create: {
          title: "Check out Prisma with Next.js",
          slug: "check-out-prisma-with-nextjs",
          content: "https://www.prisma.io/nextjs",
          published: true,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      }
    }
  },
  {
    where: { email: "bob@prisma.io" },
    update: {},
    create: {
      email: "bob@prisma.io",
      name: "Bob",
      hashedPassword: "$2y$10$seeea34!sQW9.bZ.8.1234567890 ",
      posts: {
        create: [
          {
            title: "Follow Prisma on Twitter",
            slug: "follow-prisma-on-twitter",
            content: "https://twitter.com/prisma",
            published: true,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            title: "Follow Nexus on Twitter",
            slug: "follow-nexus-on-twitter",
            content: "https://twitter.com/nexusgql",
            published: true,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ]
      }
    }
  }
]

async function main() {
  console.log("Deleting all data...")

  await prisma.post.deleteMany()
  await prisma.user.deleteMany()

  console.log(`Start seeding...`)

  for (const user of users) {
    const newUser = await prisma.user.upsert({
      where: user.where,
      update: user.update,
      create: user.create
    })
    console.log(`Created user with id: ${newUser.id}`)
  }

  console.log("Seeding finished.")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
