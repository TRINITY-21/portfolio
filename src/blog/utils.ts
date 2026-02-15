import fm from 'front-matter'
import type { BlogPost, BlogPostMeta } from './types'

function calculateReadingTime(text: string): string {
  const words = text.trim().split(/\s+/).length
  const minutes = Math.ceil(words / 200)
  return `${minutes} min read`
}

const postFiles = import.meta.glob('./posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: false,
})

interface FrontmatterAttributes {
  title: string
  slug: string
  date: string
  updated?: string
  description: string
  tags: string[]
  coverImage?: string
  published?: boolean
}

export async function getAllPostsMeta(): Promise<BlogPostMeta[]> {
  const posts: BlogPostMeta[] = []

  for (const [, loader] of Object.entries(postFiles)) {
    const raw = (await loader()) as string
    const { attributes, body } = fm<FrontmatterAttributes>(raw)
    if (attributes.published !== false) {
      posts.push({
        ...attributes,
        published: attributes.published ?? true,
        readingTime: calculateReadingTime(body),
      })
    }
  }

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  for (const [, loader] of Object.entries(postFiles)) {
    const raw = (await loader()) as string
    const { attributes, body } = fm<FrontmatterAttributes>(raw)

    if (attributes.slug === slug) {
      return {
        ...attributes,
        published: attributes.published ?? true,
        content: body,
        readingTime: calculateReadingTime(body),
      }
    }
  }

  return null
}

export async function getAdjacentPosts(
  slug: string
): Promise<{ prev: BlogPostMeta | null; next: BlogPostMeta | null }> {
  const posts = await getAllPostsMeta()
  const index = posts.findIndex((p) => p.slug === slug)
  if (index === -1) return { prev: null, next: null }
  return {
    prev: index < posts.length - 1 ? posts[index + 1] : null,
    next: index > 0 ? posts[index - 1] : null,
  }
}
