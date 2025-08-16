import Link from "next/link"
import SearchBar from "./SearchBar"
import { getAllPosts } from "@/lib/api"
import NavigationLinks from "./NavigationLinks"
import { NAV_LINKS } from "@/constants/navigation"

export default async function Header() {
  const allPosts = getAllPosts()

  return (
    <header className="bg-gray-800/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8 gap-5">
            <Link href="/" className="text-3xl">
              <span className="text-amber-700 hover:text-gray-300 transition-colors duration-300">
                Tech
              </span>
              <span className="text-gray-300 hover:text-amber-700 transition-colors duration-300">
                Blog
              </span>
            </Link>

            <NavigationLinks links={NAV_LINKS} />
          </div>
          <div className="w-1/3 max-w-xs">
            <SearchBar allPosts={allPosts} />
          </div>
        </div>
      </div>
    </header>
  )
}
