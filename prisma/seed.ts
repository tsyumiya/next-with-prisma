import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// type User = {
//   id: String
//   email: String
//   name?: String
//   createdAt: Date
//   posts: Post[]
// }

// type Post = {
//   id: String
//   title: String
//   content?: String
//   published: Boolean
//   createdAt: Date
//   updatedAt: Date
//   author: User
// }

const people = [
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
  console.log(`Start seeding...`)

  for (const person of people) {
    const newPerson = await prisma.user.upsert({
      where: person.where,
      update: person.update,
      create: person.create
    })
    console.log(`Created user with id: ${newPerson.id}`)
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
