---
title: 'A Guide to Data Fetching in Next.js'
date: '2025-08-20'
author: 'Soheil Goodarzi.'
excerpt: 'Next.js extends the native fetch API to provide powerful caching and revalidation strategies like SSG, SSR, and ISR.'
coverImage: '/images/data-fetching-guide.webp'
tags: ['Next.js', 'Data Fetching', 'SSG', 'SSR']

---

Next.js revolutionizes data fetching by allowing it to happen on the server, before a page is ever sent to the browser. The key to controlling this is the `fetch` API.

## Static Site Generation (SSG)

This is the default behavior. Data is fetched once at build time. It's incredibly fast and perfect for content that doesn't change often.

`fetch('https://api.example.com/data')`

## Server-Side Rendering (SSR)

For dynamic data that needs to be fresh on every request, you can opt out of caching.

`fetch('https://api.example.com/data', { cache: 'no-store' })`

## Incremental Static Regeneration (ISR)

The best of both worlds. Serve static content, but re-fetch it in the background at a specified interval.

`fetch('https://api.example.com/data', { next: { revalidate: 3600 } }) // Revalidate every hour`
