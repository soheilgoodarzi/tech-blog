import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { Post } from "./types"

// مسیر پوشه پست‌ها را مشخص می‌کنیم
const postsDirectory = path.join(process.cwd(), "posts")

export function getAllPosts(): Post[] {
  // ۱. نام تمام فایل‌های داخل پوشه posts را می‌خوانیم
  const fileNames = fs.readdirSync(postsDirectory)

  const allPostsData = fileNames.map((fileName) => {
    // ۲. پسوند .md را از نام فایل حذف می‌کنیم تا slug را به دست آوریم
    const slug = fileName.replace(/\.md$/, "")

    // ۳. محتوای هر فایل Markdown را می‌خوانیم
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, "utf8")

    // ۴. با gray-matter، اطلاعات متا (frontmatter) را از محتوا جدا می‌کنیم
    const matterResult = matter(fileContents)

    // ۵. داده‌های استخراج شده را با slug ترکیب می‌کنیم
    return {
      slug,
      ...(matterResult.data as {
        date: string
        title: string
        excerpt: string
        coverImage: string
        tags: string[]
      }),
    }
  })

  // ۶. پست‌ها را بر اساس تاریخ مرتب می‌کنیم تا جدیدترین‌ها اول نمایش داده شوند
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
