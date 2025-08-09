import Link from "next/link"
import { getAllPosts, getAllTags } from "@/lib/api"
import CategoryFilter from "@/components/CategoryFilter"

// کامپوننت حالا searchParams را به عنوان پراپ دریافت می‌کند
export default function HomePage({
  searchParams,
}: {
  searchParams: { tag: string }
}) {
  const allPosts = getAllPosts()
  const allTags = getAllTags()
  const currentTag = searchParams.tag

  // اگر یک تگ انتخاب شده بود، پست‌ها را فیلتر کن
  const filteredPosts = currentTag
    ? allPosts.filter((post) => post.tags.includes(currentTag))
    : allPosts

  return (
    <>
      {/* کامپوننت فیلتر تگ‌ها را اینجا رندر می‌کنیم */}
      <CategoryFilter allTags={allTags} />

      <div className="max-w-2xl mx-auto py-18 px-4 sm:px-6 lg:px-8">
        <div className="space-y-10">
          {filteredPosts.map((post) => (
            <article key={post.slug}>
              <p className="text-gray-500 text-sm leading-relaxed">{post.date}</p>
              <h2 className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors mt-1">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="text-lg text-gray-600 mt-3">{post.excerpt}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="text-blue-500 hover:text-blue-600 font-semibold mt-4 inline-block"
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </>
  )
}
