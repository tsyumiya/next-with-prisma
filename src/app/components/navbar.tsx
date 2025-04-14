import Link from "next/link"
import SearchComponent from "./search"
import { signOut } from "../../auth"

export default function Navbar() {
  return (
    <header className="col-span-2 bg-gray-800 text-white p-4 md:block md:col-start-2">
      <div className="container mx-auto flex justify-end items-center gap-5">
        <SearchComponent />
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/dashboard" className="hover:text-blue-300">
                Home
              </Link>
            </li>

            <li>
              <Link href="/dashboard/create" className="hover:text-blue-300">
                Criar Post
              </Link>
            </li>

            <li>
              <a href="#" className="hover:text-blue-300">
                Perfil
              </a>
            </li>

            <li>
              <form
                action={async () => {
                  "use server"
                  await signOut({ redirectTo: "/" })
                }}>
                <button className="hover:text-blue-300 cursor-pointer">Logout</button>
              </form>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
