import Link from "next/link"
import { prisma } from "../../lib/db"
import { createPost } from "@/app/lib/actions"
import { DeletePost } from "../../ui/posts/buttons"

export default async function Home() {
  const posts = await prisma.post.findMany({
    where: {},
    orderBy: {
      createdAt: "asc"
    },
    include: {
      author: true
    }
  })
  return (
    <main>
      <h1 className="text-3xl font-semibold">All Posts ({posts.length})</h1>
      <ul className="border-t border-b border-black/10 py-5 my-5 leading-8">
        {posts.map(post => {
          return (
            <li className="flex justify-between gap-3">
              <Link href={`/dashboard/post/${post.id}`}>
                {post.title} - created by {post.author.name}
              </Link>
              {/* <DeletePost id={post.id} /> */}
            </li>
          )
        })}
      </ul>
    </main>
  )
}
