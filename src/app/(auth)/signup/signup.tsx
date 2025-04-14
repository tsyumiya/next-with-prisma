"use client"

import clsx from "clsx"
import { signUp } from "../../lib/actions"
import { useActionState } from "react"

export default function SignupForm() {
  const [message, formAction, isPending] = useActionState(signUp, undefined)

  return (
    <div>
      <form action={formAction} className="mt-4">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 ">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="p-2 mt-1 block w-full rounded-md shadow-md ring ring-gray-300 focus:outline-hidden"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 ">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="p-2 mt-1 block w-full rounded-md shadow-md ring ring-gray-300 focus:outline-hidden"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="p-2 mt-1 block w-full rounded-md border-gray-300 shadow-md ring ring-gray-300 focus:outline-hidden"
            required
          />
        </div>
        <button
          type="submit"
          className="cursor-pointer w-full rounded-md bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300">
          Sign Up
        </button>
      </form>
      {message?.errors && (
        <ul className="text-red-500">
          {Object.entries(message.errors).map(([field, messages]) => (
            <li key={field}>
              {field}: {messages.join(", ")}
            </li>
          ))}
        </ul>
      )}

      {/* <p className="text-red-500">{message?.message}</p> */}

      <p
        className={clsx({
          "text-green-500": message?.success == true,
          "text-red-500": message?.success == false
        })}>
        {message?.message}
      </p>
    </div>
  )
}
