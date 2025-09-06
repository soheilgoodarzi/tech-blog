import { getAllPosts, getPostBySlug } from "@/lib/api"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Metadata } from "next"

// ✅ generateStaticParams باید async باشد و await روی getAllPosts اعمال شود
export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

type MetadataProps = {
  params: { slug: string }
}

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return { title: "Post Not Found" }
  }

  return {
    title: `${post.title} | TechBlog by Soheil`,
    description: post.excerpt,
  }
}

type PageProps = {
  params: { slug: string }
}

export default async function PostPage({ params }: PageProps) {
  const post = await getPostBySlug(params.slug)

  if (!post) notFound()

  return (
    <div className="max-w-[95%] md:max-w-[80%] mx-auto py-8 px-4">
      <article>
        <header className="relative w-full h-52 md:h-72 lg:h-96 rounded-2xl overflow-hidden">
          <Image
            src={post.coverImage}
            alt={`Cover image for ${post.title}`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gray-600/80" />
          <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white p-4">
            <h1 className="text-base md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4 [text-shadow:_0_2px_4px_rgb(0_0_0_/_50%)]">
              {post.title}
            </h1>
            <p className="text-gray-200 text-xs md:text-base [text-shadow:_0_1px_2px_rgb(0_0_0_/_50%)]">
              By {post.author} on {post.date}
            </p>
          </div>
        </header>

        <div
          className="md:mt-8 mt-3 text-xs md:text-base prose prose-invert lg:prose-xl max-w-none md:ml-4 ml-1 mx-auto prose-h2:text-3xl prose-p:leading-relaxed prose-a:text-blue-400 hover:prose-a:text-blue-300"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        <div className="mt-4 pt-2 border-t border-gray-700 mx-auto">
          <h3 className="text-base md:text-lg font-semibold text-gray-300 mb-4">
            Tags
          </h3>
          <div className="flex flex-wrap gap-3">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/?tag=${tag}`}
                className="bg-gray-700 text-gray-200 hover:bg-blue-500 hover:text-white transition-colors text-xs md:text-sm font-medium px-3 py-1.5 rounded-full"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      </article>
    </div>
  )
}
