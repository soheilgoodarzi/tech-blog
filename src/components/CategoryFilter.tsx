"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"

type CategoryFilterProps = {
  allTags: string[]
}

export default function CategoryFilter({ allTags }: CategoryFilterProps) {
  const searchParams = useSearchParams()
  const currentTag = searchParams.get("tag")

  return (
    <div className="bg-gray-800 py-4 border-b border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2 justify-center">
          <Link
            href="/"
            className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${
              !currentTag
                ? "bg-amber-700 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            All
          </Link>
          {allTags.map((tag) => (
            <Link
              key={tag}
              href={`/?tag=${tag}`}
              className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${
                currentTag === tag
                  ? "bg-amber-700 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
