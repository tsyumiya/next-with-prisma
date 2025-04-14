"use server"

import { prisma } from "@/app/lib/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"
import { signIn } from "../../auth"
import { AuthError } from "next-auth"
import { hash } from "bcryptjs"

const FormSchema = z.object({
  id: z.string(),
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content is required" })
})

const signupSchema = z.object({
  name: z.string().min(2, { message: "Name must have at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must have at least 6 characters" })
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
})

export type State = {
  errors?: {
    title?: string[]
    content?: string[]
  }
  message?: string | null
}

export type UserState = {
  errors?: {
    name?: string[]
    email?: string[]
    password?: string[]
  }
  message?: string | null
  success?: boolean
}

const CreatePost = FormSchema.omit({ id: true })
const EditPost = FormSchema.omit({ id: true })

export async function createPost(prevState: State | undefined, formData: FormData) {
  const validatedFields = CreatePost.safeParse({
    title: formData.get("title"),
    content: formData.get("content")
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing required fields. Failed to create post."
    }
  }

  const { title, content } = validatedFields.data
  const slug = title?.replace(/\s+/g, "-").toLowerCase()

  try {
    await prisma.post.create({
      data: {
        title: title,
        slug: slug,
        content: content,
        published: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        author: {
          connect: {
            email: "alice@prisma.io"
          }
        }
      }
    })
  } catch (error) {
    return {
      message: "Database error: failed to create post."
    }
  }

  revalidatePath("/posts")
  redirect("/dashboard")
}

export async function editPost(id: string, prevState: State | undefined, formData: FormData) {
  const validatedFields = EditPost.safeParse({
    title: formData.get("title"),
    content: formData.get("content")
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing required fields. Failed to edit post."
    }
  }

  const { title, content } = validatedFields.data
  const slug = title?.replace(/\s+/g, "-").toLowerCase()

  try {
    const resp = await prisma.post.update({
      where: {
        id
      },
      data: {
        title: title,
        slug: slug,
        content: content,
        updatedAt: new Date()
      }
    })

    console.log(resp)
  } catch (error) {
    return {
      message: "Database error: failed to update post."
    }
  }

  revalidatePath("/posts")
  redirect("/dashboard")
}

export async function deletePost(id: string) {
  try {
    await prisma.post.delete({ where: { id } })
  } catch (error) {
    console.error("Error deleting post:", error)
  }
  revalidatePath("/posts")
  redirect("/dashboard")
}

export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    await signIn("credentials", formData)
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials"
        default:
          return "Something went wrong"
      }
    }
    throw error
  }
}

export async function signUp(prevState: UserState | undefined, formData: FormData) {
  const rawFormData = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password")
  }

  const validatedFields = signupSchema.safeParse(rawFormData)

  if (!validatedFields.success) {
    console.log("validatedFields.error", validatedFields.error.flatten().fieldErrors)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing required fields. Failed to create user.",
      success: false
    }
  }

  const { name, email, password } = validatedFields.data

  try {
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (user) {
      console.log("User already exists:", user)
      return {
        success: false,
        message: "User already exists"
      }
    }

    const hashedPassword = await hash(password, 10)

    await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword
      }
    })

    // return {
    //   success: true,
    //   message: "User created successfully"
    // }

    prevState = {
      success: true,
      message: "User created successfully"
    }
  } catch (error) {
    console.error("Error creating user:", error)
    return {
      success: false,
      message: "Something went wrong. Failed to create user."
    }
  } finally {
    await signIn("credentials", {
      email,
      password,
      redirect: true
    })
  }
}
