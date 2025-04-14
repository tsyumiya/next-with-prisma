"use client"

import { createPost, State } from "@/app/lib/actions"
import { useActionState } from "react"

export default function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const initialState: State = { message: null, errors: {} }
  const [state, formAction] = useActionState(createPost, initialState)

  return (
    <form action={formAction} className="flex flex-col gap-3 w-[500px] ">
      <input type="text" name="title" placeholder="Title" className="px-2 py-1 rounded-sm bg-white" />
      <div id="customer-error" aria-live="polite" aria-atomic="true">
        {state?.errors &&
          state.errors?.title?.map((error: string) => (
            <p className="mt-0.5 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
      <textarea name="content" rows={10} placeholder="Content" className="px-2 py-1 rounded-sm bg-white" />
      <div id="customer-error" aria-live="polite" aria-atomic="true">
        {state?.errors &&
          state.errors?.content?.map((error: string) => (
            <p className="mt-0.5 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
      <button type="submit" className="cursor-pointer bg-blue-500 py-2 text-white rounded-sm">
        Create Post
      </button>
    </form>
  )
}
