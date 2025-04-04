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
    <form className="flex flex-col gap-3 w-[500px]  ">
      <input
        defaultValue={post?.title}
        type="text"
        name="title"
        placeholder="Title"
        className="px-2 py-1 rounded-sm bg-white"
      />
      <textarea
        defaultValue={post?.content ?? ""}
        name="content"
        rows={10}
        placeholder="Content"
        className="px-2 py-1 rounded-sm bg-white"
      />
      <button type="submit" className="bg-blue-500 py-2 text-white rounded-sm">
        Update Post
      </button>
    </form>
  )
}
