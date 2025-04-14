"use client"

import { Search } from "lucide-react"
import { useDebouncedCallback } from "use-debounce"
import { useSearchParams, usePathname, useRouter } from "next/navigation"

export default function SearchComponent() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)
    if (term) {
      params.set("query", term)
    } else {
      params.delete("query")
    }
    console.log(pathname)
    replace(`${pathname}?${params.toString()}`)
  }, 500)

  return (
    <div className="relative flex gap-5">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        type="text"
        defaultValue={searchParams.get("query")?.toString()}
        onChange={e => handleSearch(e.target.value)}
        className="peer focus:outline-1 focus:outline-white block border-gray-200 rounded-md w-full outline-1 text-sm py-[3px] pl-2 placeholder:text-gray-200"
      />
      <Search className="cursor-pointer" />
    </div>
  )
}
