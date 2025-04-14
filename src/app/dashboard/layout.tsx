import Footer from "../components/footer"
import Navbar from "../components/navbar"
import Sidebar from "../components/sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] grid-rows-[auto_auto_1fr_auto] md:grid-rows-[auto_1fr_auto] min-h-screen">
      <Sidebar />
      <Navbar />
      <div className="flex flex-col items-center gap-y-5 pt-24">{children}</div>
      <Footer />
    </div>
  )
}
