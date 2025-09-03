"use client"

import { useState, useEffect, FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Search, X, ArrowUp } from "lucide-react"
import SearchResults from "./SearchResults"
import { Post } from "@/lib/types"

export default function SearchBar({ allPosts }: { allPosts: Post[] }) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Post[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isModalOpen])

  useEffect(() => {
    if (query.trim()) {
      const filteredPosts = allPosts.filter((post) =>
        post.title.toLowerCase().includes(query.toLowerCase())
      )
      setResults(filteredPosts)
    } else {
      setResults([])
    }
  }, [query, allPosts])

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!query.trim()) return
    router.push(`/search?q=${query}`)
    closeSearch()
  }

  const closeSearch = () => {
    setIsModalOpen(false)
    setTimeout(() => {
      setQuery("")
      setResults([])
    }, 300)
  }

  return (
    <div className="w-full">
      {/* Desktop */}
      <div className="hidden md:block relative">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles..."
            className="bg-gray-700/50 rounded-full w-full pl-4 pr-10 py-1.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:bg-gray-700 focus:ring-2 focus:ring-amber-700"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-700 hover:text-white"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>
        {results.length > 0 && (
          <div className="absolute top-full mt-2 w-full z-50">
            <SearchResults results={results} onResultClick={closeSearch} />
          </div>
        )}
      </div>
      {/* Icon Search in mobile */}

      <div className="md:hidden flex justify-end">
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-gray-300 hover:text-white p-2"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>

      {/* mobile search modal */}
      {/* layer background */}
      <div
        aria-hidden="true"
        className={`md:hidden fixed inset-0 bg-black/60 z-[998] transition-opacity duration-300
          ${isModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={closeSearch}
      />
      {/* modal content */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full bg-gray-900 z-[999] p-4 flex flex-col transition-transform duration-300 ease-in-out rounded-t-2xl border-t border-gray-700
          ${isModalOpen ? "translate-y-0" : "translate-y-[-1000px]"}`}
        style={{ height: "100vh" }}
      >
        <div className="flex justify-between items-center mb-4 flex-shrink-0">
          <span className="text-md font-semibold text-white mt-2">Search</span>
          <button
            onClick={closeSearch}
            className="text-gray-300 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSearchSubmit} className="relative flex-shrink-0">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles..."
            className="bg-gray-800 border placeholder:text-sm placeholder:font-light border-gray-700 rounded-full w-full px-4 py-2.5 pr-10 text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-700"
            autoFocus
          />
          <button
            type="submit"
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-amber-700 hover:text-white"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </form>
        {query.trim() && results.length > 0 ? (
          <div className="relativ left-0 top-0 mt-4 flex-grow overflow-y-auto no-scrollbar z-10">
            <SearchResults results={results} onResultClick={closeSearch} />
          </div>
        ) : null}
      </div>
    </div>
  )
}
