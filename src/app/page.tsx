import Link from "next/link"
import Image from "next/image"
import { getAllPosts, getAllTags } from "@/lib/api"
import CategoryFilter from "@/components/CategoryFilter"
import { ArrowRight } from "lucide-react"

export default function HomePage({
  searchParams,
}: {
  searchParams: { tag: string }
}) {
  const allPosts = getAllPosts()
  const allTags = getAllTags()
  const currentTag = searchParams.tag

  const filteredPosts = currentTag
    ? allPosts.filter((post) => post.tags.includes(currentTag))
    : allPosts

  return (
    <>
      <CategoryFilter allTags={allTags} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="space-y-12 md:space-y-16">
          {filteredPosts.map((post) => (
            <div
              key={post.slug}
              className="grid grid-cols-1 md:grid-cols-2 md:gap-10 items-center"
            >
              <div className="p-4 md:p-6 flex flex-col h-full">
                <div className="flex-grow">
                  <p className="text-gray-400 text-xs md:text-sm mb-2">
                    {post.date}
                  </p>
                  <h2 className="text-lg md:text-2xl font-bold text-gray-100 hover:text-blue-400 transition-colors mt-1">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="text-sm md:text-lg text-gray-300 mt-2  md:mt-4 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-blue-400 hover:text-blue-300 font-semibold mt-2 md:mt-6 inline-block self-start"
                >
                  Read more →
                </Link>
              </div>
              <div className="relative h-40 md:h-60 rounded-xl overflow-hidden shadow-2xl order-first md:order-last">
                <Image
                  src={post.coverImage}
                  alt={`Cover image for ${post.title}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 text-white">
                  <h3 className="text-lg md:text-xl font-bold">{post.title}</h3>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-2 inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-lg text-white font-semibold py-2 px-4 rounded-lg text-sm transition-all transform hover:scale-105"
                  >
                    Read Post <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
