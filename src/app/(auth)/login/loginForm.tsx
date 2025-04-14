"use client"

import { useActionState } from "react"
import { authenticate } from "@/app/lib/actions"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

export default function LoginForm() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard"
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined)

  return (
    <form action={formAction}>
      <div className="flex flex-col space-y-2.5">
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="p-2 mt-1 block w-full rounded-md shadow-md ring ring-gray-300 focus:outline-hidden"
          required
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="p-2 mt-1 block w-full rounded-md shadow-md ring ring-gray-300 focus:outline-hidden"
          required
        />

        <input type="hidden" name="redirectTo" value={callbackUrl} />
        <button
          type="submit"
          disabled={isPending}
          className={`w-full rounded-md bg-blue-500 p-2 text-white ${isPending ? "opacity-50" : ""}`}>
          {isPending ? "Loading..." : "Login"}
        </button>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </div>
      <div className="flex justify-between mt-4">
        <a href="/auth/forgot-password" className="text-blue-500 hover:underline">
          Forgot Password?
        </a>
        <Link href="/signup" className="text-blue-500 hover:underline">
          Sign Up
        </Link>
      </div>
    </form>
  )
}
