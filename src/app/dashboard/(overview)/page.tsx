import Link from "next/link"
import { prisma } from "../../lib/db"
import Pagination from "@/app/components/pagination"
import { auth } from "../../../auth"
import { redirect } from "next/navigation"

export default async function Home(props: {
  searchParams?: Promise<{
    query?: string
    page?: string
  }>
}) {
  const session = await auth()
  const searchParams = await props.searchParams
  const query = searchParams?.query || ""
  const currentPage = Number(searchParams?.page) || 1
  const pageSize = 10
  const skip = (currentPage - 1) * pageSize

  const totalPosts = await prisma.post.count({
    where: query
      ? {
          OR: [
            {
              title: {
                contains: query,
                mode: "insensitive"
              }
            },
            {
              content: {
                contains: query,
                mode: "insensitive"
              }
            }
          ]
        }
      : {}
  })

  const totalPages = Math.ceil(totalPosts / pageSize)

  const posts = await prisma.post.findMany({
    where: query
      ? {
          OR: [
            {
              title: {
                contains: query,
                mode: "insensitive"
              }
            },
            {
              content: {
                contains: query,
                mode: "insensitive"
              }
            }
          ]
        }
      : {},
    orderBy: {
      createdAt: "asc"
    },
    include: {
      author: true
    },
    skip,
    take: pageSize
  })

  console.log(session?.user)

  if (!session?.user) {
    redirect("/login")
  }

  return (
    <main>
      <h1 className="text-3xl font-semibold">All Posts ({totalPosts})</h1>
      <ul className="border-t border-b border-black/10 py-5 my-5 leading-8">
        {posts.map(post => {
          return (
            <li key={post.id} className="flex justify-between gap-3">
              <Link href={`/dashboard/post/${post.id}`}>
                {post.title} - created by {post.author.name}
              </Link>
            </li>
          )
        })}
      </ul>
      <Pagination totalPages={totalPages} currentPage={currentPage} query={query} />
    </main>
  )
}
