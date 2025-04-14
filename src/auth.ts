import NextAuth from "next-auth"
import { authConfig } from "./auth.config"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"
import { prisma } from "@/app/lib/db"
import bcryptjs from "bcryptjs"
import type { User } from "@/app/lib/definitions"

async function getUser(email: string): Promise<User | null | undefined> {
  try {
    const user = await prisma.user.findUnique({
      where: { email }
    })
    console.log("User found:", user)
    return user
  } catch (error) {
    console.error("Error fetching user:", error)
    throw new Error("Failed to fetch user")
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials)

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data
          const user = await getUser(email)
          if (!user) return null
          const passwordsMatch = await bcryptjs.compare(password, user.password)

          if (passwordsMatch) return user
        }

        console.log("Invalid credentials:", parsedCredentials.error)
        return null
      }
    })
  ]
})
