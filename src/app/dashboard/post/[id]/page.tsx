import Link from "next/link"
import { prisma } from "@/app/lib/db"
import { cache } from "react"
import { DeletePost, UpdatePost } from "@/app/ui/posts/buttons"

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = await prisma.post.findUnique({
    where: { id },
    include: { author: true }
  })

  return (
    <main className="flex flex-col items-center gap-y-5 pt-24">
      <div className="flex gap-5">
        <h1 className="text-3xl font-semibold">{post?.title}</h1>
        {post?.id && <UpdatePost id={post.id} />}
        {post?.id && <DeletePost id={post.id} />}
      </div>
      <p>{post?.content}</p>
    </main>
  )
}
