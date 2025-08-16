import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { Post } from "./types"
import html from "remark-html"
import { remark } from "remark"
//Specifying the path for blog posts
const postsDirectory = path.join(process.cwd(), "posts")

export function getAllPosts(): Post[] {
  // Read the names of all the files in the posts folder
  const fileNames = fs.readdirSync(postsDirectory)

  const allPostsData = fileNames.map((fileName) => {
    //Remove the .md extension from the file name to get the slug
    const slug = fileName.replace(/\.md$/, "")
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const matterResult = matter(fileContents)

    return {
      slug,
      ...(matterResult.data as {
        date: string
        author: string
        title: string
        excerpt: string
        coverImage: string
        tags: string[]
      }),
    }
  })

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}
export function getAllTags(): string[] {
  const allPosts = getAllPosts()
  // delete all duplicate tags
  const allTags = new Set<string>()
  allPosts.forEach((post) => {
    post.tags.forEach((tag) => allTags.add(tag))
  })

  return Array.from(allTags).sort()
}
export async function getPostBySlug(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  try {
    const fileContents = fs.readFileSync(fullPath, "utf8")

    const matterResult = matter(fileContents)

    const processedContent = await remark()
      .use(html)
      .process(matterResult.content)
    const contentHtml = processedContent.toString()

    return {
      slug,
      contentHtml,
      ...(matterResult.data as {
        date: string
        title: string
        author: string
        excerpt: string
        coverImage: string
        tags: string[]
      }),
    }
  } catch (error) {
    console.error(`Error reading post with slug "${slug}":`, error)
    return null
  }
}
