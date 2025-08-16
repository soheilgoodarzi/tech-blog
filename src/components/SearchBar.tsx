"use client"
import { useState, useEffect, FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Post } from "@/lib/types"

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

  return (
    <div className="relative w-full">
      <form onSubmit={handleSearchSubmit}>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search articles..."
          className="bg-gray-700/50 rounded-full w-full px-4 py-1.5 pr-10 text-sm text-white placeholder-gray-400 focus:outline-none focus:bg-gray-700 focus:ring-2 focus:ring-amber-700"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-amber-700 hover:text-white"
        >
          <Search className="w-4 h-4" />
        </button>
      </form>

      {results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
          <ul>
            {results.slice(0, 5).map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  onClick={() => setQuery("")}
                  className="flex items-center gap-4 p-3 hover:bg-gray-700/50 transition-colors"
                >
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    width={40}
                    height={40}
                    className="w-10 h-10 object-cover rounded-md"
                  />
                  <span className="text-sm text-gray-200">{post.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
