import Link from "next/link"
import { prisma } from "./lib/db"
import { createPost } from "@/app/lib/actions"
import { DeletePost } from "./ui/posts/buttons"

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
    <main className="flex flex-col items-center gap-y-5 pt-24">
      <h1 className="text-3xl font-semibold">All Posts ({posts.length})</h1>
      <ul className="border-t border-b border-black/10 py-5 leading-8">
        {posts.map(post => {
          return (
            <li className="flex justify-between gap-3">
              <Link href={`/post/${post.slug}`}>
                {post.title} - created by {post.author.name}
              </Link>
              <DeletePost id={post.id} />
            </li>
          )
        })}
      </ul>

      <form action={createPost} className="flex flex-col gap-3 w-[300px] ">
        <input type="text" name="title" placeholder="Title" className="px-2 py-1 rounded-sm bg-white" />
        <textarea name="content" rows={5} placeholder="Content" className="px-2 py-1 rounded-sm bg-white" />
        <button type="submit" className="bg-blue-500 py-2 text-white rounded-sm">
          Create Post
        </button>
      </form>
    </main>
  )
}
