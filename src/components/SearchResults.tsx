import Link from "next/link"
import Image from "next/image"
import { Post } from "@/lib/types"

type SearchResultsProps = {
  results: Post[]
  onResultClick: () => void
}

export default function SearchResults({
  results,
  onResultClick,
}: SearchResultsProps) {
  return (
    <>
    <div className="hidden md:block">
    <div className="absolute top-full mt-2 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
      <ul>
        {results.slice(0, 5).map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              onClick={onResultClick}
              className="flex items-center gap-4 p-3 hover:bg-gray-700/50 transition-colors"
            >
              <Image
                src={post.coverImage}
                alt={post.title}
                width={50}
                height={50}
                className="w-12 h-12 object-cover rounded-md"
              />
              <span className="text-sm text-gray-200">{post.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
    </div>
    {/* Search Result for Mobile Media Query */}
    <div className="md:hidden">
      <ul>
        {results.slice(0, 5).map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              onClick={onResultClick}
              className="flex items-center gap-4 p-3 hover:bg-gray-700/50 transition-colors"
            >
              <Image
                src={post.coverImage}
                alt={post.title}
                width={50}
                height={50}
                className="w-12 h-12 object-cover rounded-md"
              />
              <span className="text-sm text-gray-200">{post.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
    </>
  )
}
