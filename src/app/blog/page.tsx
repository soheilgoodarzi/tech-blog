import Link from "next/link"
import { getAllPosts } from "@/lib/api"

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main className="flex min-h-screen flex-col items-center p-12">
      <h1 className="text-4xl font-bold mb-8">وبلاگ من</h1>
      <div className="w-full max-w-3xl space-y-8">
        {posts.map((post) => (
          <article key={post.slug} className="border-b pb-4">
            <h2 className="text-3xl font-bold text-blue-600 hover:text-blue-800">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="text-gray-500 mt-2">{post.date}</p>
            <p className="text-lg text-gray-700 mt-2">{post.excerpt}</p>
          </article>
        ))}
      </div>
    </main>
  )
}
