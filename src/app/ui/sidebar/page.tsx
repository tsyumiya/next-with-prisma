import Link from "next/link"

export default function Sidebar() {
  return (
    <aside className="bg-gray-700 text-white p-4 hidden md:block md:row-span-2 md:col-start-1">
      <div className="text-xl font-bold mb-6 pt-4">Sidebar</div>
      <nav>
        <h2 className="text-lg font-semibold mb-4 text-gray-300">Menu</h2>
        <ul className="space-y-2">
          <li>
            <a href="#" className="block p-2 rounded hover:bg-gray-600">
              Dashboard
            </a>
          </li>
          <li>
            <a href="#" className="block p-2 rounded hover:bg-gray-600">
              Analytics
            </a>
          </li>
          <li>
            <a href="#" className="block p-2 rounded hover:bg-gray-600">
              Reports
            </a>
          </li>
          <li>
            <a href="#" className="block p-2 rounded hover:bg-gray-600">
              Settings
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  )
}
