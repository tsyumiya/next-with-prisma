import Link from "next/link"

export default function Pagination({
  currentPage,
  totalPages,
  query
}: {
  currentPage: number
  totalPages: number
  query: string
}) {
  return (
    <div className="flex justify-between items-center mt-6">
      <div>
        Page {currentPage} of {totalPages}
      </div>
      <div className="flex gap-2">
        {currentPage > 1 && (
          <Link
            href={`/dashboard/?query=${query}&page=${currentPage - 1}`}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Previous
          </Link>
        )}
        {currentPage < totalPages && (
          <Link
            href={`/dashboard/?query=${query}&page=${currentPage + 1}`}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Next
          </Link>
        )}
      </div>
    </div>
  )
}
