import Link from "next/link"
import { prisma } from "@/app/lib/db"
import EditForm from "@/app/components/posts/editForm"
import notFound from "./not-found"

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  console.log(id)
  const post = await prisma.post.findUnique({
    where: { id },
    include: { author: true }
  })

  if (!post) {
    return notFound()
  }

  return <EditForm post={{ ...post, content: post.content ?? "" }} />
}
