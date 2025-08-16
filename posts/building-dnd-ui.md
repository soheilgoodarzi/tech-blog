---
title: "Building a Drag-and-Drop UI with Dnd Kit"
date: "2025-08-25"
author: "Soheil Goodarzi."
excerpt: "Creating interactive drag-and-drop interfaces in React is easier than ever with modern libraries like Dnd Kit."
coverImage: "/images/building-dnd-ui.svg"
tags: ["React", "Dnd Kit", "UI/UX"]
---

Drag-and-drop is a complex feature to build from scratch. Thankfully, libraries like **Dnd Kit** provide a powerful, accessible, and modern toolkit for creating these experiences in React.

The core concepts involve:

1.  **DndContext**: A wrapper that provides the context for the drag-and-drop operations.
2.  **useDraggable / useSortable**: Hooks that make your components draggable.
3.  **useDroppable**: A hook that defines areas where draggable items can be dropped.

By using the `useSortable` hook inside our `TaskCard` component, we can easily make it draggable while keeping our code clean and modular.

```tsx
import { useSortable } from "@dnd-kit/sortable"

function TaskCard({ task }) {
  const { attributes, listeners, setNodeRef } = useSortable({ id: task.id })

  return (
    <div ref={setNodeRef} {...attributes} {...listeners}>
      {task.text}
    </div>
  )
}
```
