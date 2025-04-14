"use client"

import { cache, useActionState } from "react"
import { DeletePost, UpdatePost } from "@/app/components/posts/buttons"
import { editPost, State } from "@/app/lib/actions"
import { Post } from "@/app/lib/definitions"

export default function EditForm({ post }: { post: Post }) {
  const initialState: State = { message: null, errors: {} }
  const updatedPostWithId = editPost.bind(null, post.id)
  const [state, formAction] = useActionState(updatedPostWithId, initialState)

  return (
    <form action={formAction} className="flex flex-col gap-3 w-[500px]  ">
      <input
        defaultValue={post?.title}
        type="text"
        name="title"
        placeholder="Title"
        className="px-2 py-1 rounded-sm bg-white"
      />
      <textarea
        defaultValue={post?.content}
        name="content"
        rows={10}
        placeholder="Content"
        className="px-2 py-1 rounded-sm bg-white"
      />
      <button className="cursor-pointer bg-blue-500 py-2 text-white rounded-sm">Update Post</button>

      <div id="customer-error" aria-live="polite" aria-atomic="true">
        {state?.errors &&
          state.errors?.title?.map((error: string) => (
            <p className="mt-0.5 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>

      <div id="customer-error" aria-live="polite" aria-atomic="true">
        {state?.errors &&
          state.errors?.content?.map((error: string) => (
            <p className="mt-0.5 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
    </form>
  )
}
