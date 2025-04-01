"use server"

import { prisma } from "@/app/lib/db"
import { revalidatePath } from "next/cache"

export async function createPost(formData: FormData) {
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
}
