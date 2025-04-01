import { deletePost } from "@/app/lib/actions"
import { Trash2 } from "lucide-react"

export function DeletePost({ id }: { id: string }) {
  const deletePostWithId = deletePost.bind(null, id)

  return (
    <form action={deletePostWithId} className="flex ">
      <button type="submit">
        <span className="sr-only">Delete</span>
        <Trash2 className="w-5 cursor-pointer" />
      </button>
    </form>
  )
}
