export interface BlogPostMeta {
  title: string
  slug: string
  date: string
  updated?: string
  description: string
  tags: string[]
  coverImage?: string
  published: boolean
  readingTime: string
}

export interface BlogPost extends BlogPostMeta {
  content: string
}
