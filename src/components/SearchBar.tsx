"use client"

import { useState, useEffect, FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Post } from "@/lib/types"
import SearchResults from "./SearchResults" 

export default function SearchBar({ allPosts }: { allPosts: Post[] }) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Post[]>([])
  const router = useRouter()

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
    setResults([])
  }

  const handleResultClick = () => {
    setQuery("")
    setResults([])
  }

  return (
    <div className="relative w-full">
      <form onSubmit={handleSearchSubmit}>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles..."
          className="bg-gray-700/50 rounded-full w-full pl-4 pr-10 py-1.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:bg-gray-700 focus:ring-2 focus:ring-amber-700 xs:placeholder:text-xs"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-700 hover:text-white"
        >
          <Search className="w-4 h-4" />
        </button>
      </form>

      {results.length > 0 && (
        <SearchResults results={results} onResultClick={handleResultClick} />
      )}
    </div>
  )
}
