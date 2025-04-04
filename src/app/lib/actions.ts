"use server"

import { prisma } from "@/app/lib/db"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

const FormSchema = z.object({
  id: z.string(),
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content is required" })
})

export type State = {
  errors?: {
    id: string[]
    title?: string[]
    content?: string[]
  }
  message?: string | null
}

const CreatePost = FormSchema.omit({ id: true })

export async function createPost(prevState: State, formData: FormData) {
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

  try {
    await prisma.post.create({
      data: {
        title: formData.get("title") as string,
        slug: (formData.get("title") as string).replace(/\s+/g, "-").toLowerCase(),
        content: formData.get("content") as string,
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
    console.error("Error creating post:", error)
  }

  revalidatePath("/posts")
}

export async function editPost(formData: FormData, id: string) {
  try {
    await prisma.post.update({
      where: {
        id
      },
      data: {
        title: formData.get("title") as string,
        slug: (formData.get("title") as string).replace(/\s+/g, "-").toLowerCase(),
        content: formData.get("content") as string,
        updatedAt: new Date()
      }
    })
  } catch (error) {
    console.error("Error editing post:", error)
  }
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
