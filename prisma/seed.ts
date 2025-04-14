import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

const users = [
  {
    where: { email: "alice@prisma.io" },
    update: {},
    create: {
      email: "alice@prisma.io",
      name: "Alice",
      password: "123456",
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
      password: "654321",
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
          },
          {
            title: "teste5",
            slug: "teste5",
            content: "https://twitter.com/nexusgql",
            published: true,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            title: "Twitter1",
            slug: "twitter1",
            content: "https://twitter.com/nexusgql",
            published: true,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            title: "Twitter2",
            slug: "Twitter2",
            content: "https://twitter.com/nexusgql",
            published: true,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            title: "Twitter3",
            slug: "Twitter3",
            content: "https://twitter.com/nexusgql",
            published: true,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            title: "Twitter4",
            slug: "Twitter4",
            content: "https://twitter.com/nexusgql",
            published: true,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            title: "Twitter5",
            slug: "Twitter5",
            content: "https://twitter.com/nexusgql",
            published: true,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            title: "Twitter6",
            slug: "Twitter6",
            content: "https://twitter.com/nexusgql",
            published: true,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            title: "Twitter7",
            slug: "Twitter7",
            content: "https://twitter.com/nexusgql",
            published: true,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            title: "Twitter8",
            slug: "Twitter8",
            content: "https://twitter.com/nexusgql",
            published: true,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            title: "Twitter9",
            slug: "Twitter9",
            content: "https://twitter.com/nexusgql",
            published: true,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            title: "teste6",
            slug: "teste6",
            content: "https://twitter.com/nexusgql",
            published: true,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            title: "teste7",
            slug: "teste7",
            content: "https://twitter.com/nexusgql",
            published: true,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            title: "teste8",
            slug: "teste8",
            content: "https://twitter.com/nexusgql",
            published: true,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            title: "teste9",
            slug: "teste9",
            content: "https://twitter.com/nexusgql",
            published: true,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            title: "teste10",
            slug: "teste10",
            content: "https://twitter.com/nexusgql",
            published: true,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            title: "teste11",
            slug: "teste11",
            content: "https://twitter.com/nexusgql",
            published: true,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            title: "teste12",
            slug: "teste12",
            content: "https://twitter.com/nexusgql",
            published: true,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            title: "teste13",
            slug: "teste13",
            content: "https://twitter.com/nexusgql",
            published: true,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            title: "teste14",
            slug: "teste14",
            content: "https://twitter.com/nexusgql",
            published: true,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            title: "teste15",
            slug: "teste15",
            content: "https://twitter.com/nexusgql",
            published: true,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            title: "teste16",
            slug: "teste16",
            content: "https://twitter.com/nexusgql",
            published: true,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            title: "teste17",
            slug: "teste17",
            content: "https://twitter.com/nexusgql",
            published: true,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            title: "teste18",
            slug: "teste18",
            content: "https://twitter.com/nexusgql",
            published: true,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            title: "teste19",
            slug: "teste19",
            content: "https://twitter.com/nexusgql",
            published: true,
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            title: "teste20",
            slug: "teste20",
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
    const password = await bcrypt.hash(user.create.password, 10) // Hash the password
    const newUser = await prisma.user.upsert({
      where: user.where,
      update: user.update,
      create: {
        ...user.create,
        password // Use the hashed password
      }
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
