import Link from "next/link"

export default function Navbar() {
  return (
    <header className="col-span-2 bg-gray-800 text-white p-4 md:block md:col-start-2">
      <div className="container mx-auto flex justify-end items-center ">
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
          </ul>
        </nav>
      </div>
    </header>
  )
}
