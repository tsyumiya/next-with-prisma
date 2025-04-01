import Link from "next/link"
import { prisma } from "@/app/lib/db"
import { cache } from "react"

export default async function PostPage({ params }: { params: { slug: string } }) {
  const { slug } = await params
  // const post = await prisma.post.findUnique({
  //   where: { slug },
  //   include: { author: true }
  // })

  const getPost = cache(async (slug: string) => {
    const post = await prisma.post.findUnique({
      where: { slug },
      include: {
        author: true
      }
    })

    return post
  })

  const post = await getPost(slug)

  return (
    <main className="flex flex-col items-center gap-y-5 pt-24">
      <h1 className="text-3xl font-semibold">{post?.title}</h1>
      <p>{post?.content}</p>
    </main>
  )
}
