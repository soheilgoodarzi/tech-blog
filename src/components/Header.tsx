import Link from "next/link"
import { Search } from "lucide-react"

export default function Header() {
  return (
    <header className="bg-gray-800/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-700">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8 gap-5">
            <Link
              href="/"
              className="text-3xl font-stretch-100%"
            >
              <span className="text-amber-700 hover:text-gray-300 transition-color duration-300">Tech</span>
              <span className="text-gray-300 hover:text-amber-700 transition-color duration-300">Blog</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-10 mt-[5px]">
              <Link
                href="/"
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Articles
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                About
              </Link>
            </nav>
          </div>
          <div className="flex items-center">
            <div className="relative">
              <input
                type="search"
                placeholder="Search articles..."
                className="bg-gray-700/50 rounded-full px-4 py-1.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:bg-gray-700 focus:ring-2 focus:ring-amber-700"
              />
              <Search className="w-4 h-4 absolute text-amber-700 right-3 top-1/2 -translate-y-1/2 " />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
