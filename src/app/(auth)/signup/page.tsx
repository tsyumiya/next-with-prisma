import { Suspense } from "react"
import SignupForm from "./signup"
import Loading from "./loading"

export default function SignupPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-10 w-full items-center rounded-lg bg-blue-500 p-3 md:h-16">
          <h1 className="text-white text-lg font-bold">Sign Up for a New Account</h1>
        </div>
        <Suspense fallback={<Loading />}>
          <SignupForm />
        </Suspense>
      </div>
    </main>
  )
}
