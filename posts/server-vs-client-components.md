---
title: 'Next.js Demystified: Server vs. Client Components'
date: '2025-08-18'
author: 'Soheil Goodarzi.'
excerpt: 'The new Next.js App Router introduces a powerful paradigm: Server-First components. Let’s explore the difference and when to use each.'
coverImage: '/images/server-vs-client-components.webp'
tags: ['Next.js', 'React', 'Architecture']
---

The biggest shift in modern Next.js development is the introduction of React Server Components (RSCs), which are the default in the App Router. Understanding the difference between Server and Client components is key to building fast, efficient applications.

## Server Components (The Default)

These components run exclusively on the server. They are perfect for fetching data, accessing backend resources, and keeping sensitive logic away from the browser. They produce a highly optimized, serializable description of the UI that is sent to the client.

**Key features:**
- Can be `async` to fetch data directly.
- Have zero impact on the client-side JavaScript bundle size.
- Cannot use hooks like `useState` or `useEffect`.

## Client Components (For Interactivity)

When you need interactivity—state, event listeners, or browser-only APIs—you need a Client Component. You create one by adding the `'use client'` directive at the top of your file.

```tsx
'use client';
import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}