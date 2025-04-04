import { deletePost } from "@/app/lib/actions"
import { PencilIcon, Trash2 } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"

export function DeletePost({ id }: { id: string }) {
  const deletePostWithId = deletePost.bind(null, id)

  return (
    <form action={deletePostWithId} className="flex ">
      <button type="submit" className="cursor-pointer rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <Trash2 size={22} />
      </button>
    </form>
  )
}

export function UpdatePost({ id }: { id: string }) {
  const updatePostWithId = deletePost.bind(null, id)

  return (
    <form action={updatePostWithId} className="flex ">
      <Link href={`/dashboard/post/${id}/edit`} className="cursor-pointer rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Update</span>
        <PencilIcon size={22} />
      </Link>
    </form>
  )
}
