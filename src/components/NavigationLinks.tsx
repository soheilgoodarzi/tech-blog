"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

type NavLinkItem = {
  href: string
  label: string
}
type NavigationLinksProps = {
  links: NavLinkItem[]
}

export default function NavigationLinks({ links }: NavigationLinksProps) {
  const pathname = usePathname()

  const linkStyle =
    "text-sm font-medium text-gray-300 hover:text-white transition-colors"
  const activeLinkStyle = "text-sm font-medium text-amber-700"

  const isArticlesActive = (path: string) => {
    return (
      path === "/" ||
      path.startsWith("/blog") ||
      path.startsWith("/tags") ||
      path.startsWith("/search")
    )
  }

  return (
    <nav className="hidden md:flex items-center space-x-6">
      {links.map((link) => {
        // بررسی شرطی برای لینک Articles
        const isActive =
          link.href === "/"
            ? isArticlesActive(pathname)
            : pathname === link.href

        return (
          <Link
            key={link.href}
            href={link.href}
            className={isActive ? activeLinkStyle : linkStyle}
          >
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}
