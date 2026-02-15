const SITE_URL = 'https://jagyeman.dev'
const SITE_NAME = 'Joseph Yaw Agyeman'
const DEFAULT_IMAGE = `${SITE_URL}/me-bw.jpeg`

interface MetaTagConfig {
  title: string
  description: string
  url: string
  image?: string
  type?: 'website' | 'article'
  article?: {
    publishedTime: string
    modifiedTime?: string
    author: string
    tags: string[]
  }
}

function setMeta(attr: string, value: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${value}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr.includes('property') ? 'property' : 'name', value)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(url: string) {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
  if (!link) {
    link = document.createElement('link')
    link.rel = 'canonical'
    document.head.appendChild(link)
  }
  link.href = url
}

function setJsonLd(data: object, id = 'dynamic-jsonld') {
  let script = document.getElementById(id) as HTMLScriptElement | null
  if (!script) {
    script = document.createElement('script')
    script.id = id
    script.type = 'application/ld+json'
    document.head.appendChild(script)
  }
  script.textContent = JSON.stringify(data)
}

function removeJsonLd(id = 'dynamic-jsonld') {
  document.getElementById(id)?.remove()
}

function removeArticleTags() {
  document.querySelectorAll('meta[property^="article:"]').forEach((el) => el.remove())
}

export function updateMetaTags(config: MetaTagConfig) {
  document.title = config.title

  setMeta('name', 'description', config.description)
  setMeta('property', 'og:title', config.title)
  setMeta('property', 'og:description', config.description)
  setMeta('property', 'og:url', config.url)
  setMeta('property', 'og:image', config.image || DEFAULT_IMAGE)
  setMeta('property', 'og:type', config.type || 'website')
  setMeta('name', 'twitter:title', config.title)
  setMeta('name', 'twitter:description', config.description)
  setMeta('name', 'twitter:image', config.image || DEFAULT_IMAGE)
  setCanonical(config.url)

  if (config.article) {
    setMeta('property', 'article:published_time', config.article.publishedTime)
    if (config.article.modifiedTime) {
      setMeta('property', 'article:modified_time', config.article.modifiedTime)
    }
    setMeta('property', 'article:author', config.article.author)
    config.article.tags.forEach((tag) => {
      const el = document.createElement('meta')
      el.setAttribute('property', 'article:tag')
      el.setAttribute('content', tag)
      document.head.appendChild(el)
    })
  }
}

export function updateBlogPostMeta(post: {
  title: string
  slug: string
  description: string
  date: string
  updated?: string
  tags: string[]
  coverImage?: string
}) {
  const url = `${SITE_URL}/blog/${post.slug}`
  const image = post.coverImage
    ? `${SITE_URL}${post.coverImage}`
    : `${SITE_URL}/og/${post.slug}.png`

  removeArticleTags()

  updateMetaTags({
    title: `${post.title} | ${SITE_NAME}`,
    description: post.description,
    url,
    image,
    type: 'article',
    article: {
      publishedTime: new Date(post.date).toISOString(),
      modifiedTime: post.updated ? new Date(post.updated).toISOString() : undefined,
      author: SITE_NAME,
      tags: post.tags,
    },
  })

  setJsonLd({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image,
    url,
    datePublished: new Date(post.date).toISOString(),
    dateModified: post.updated
      ? new Date(post.updated).toISOString()
      : new Date(post.date).toISOString(),
    author: {
      '@type': 'Person',
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Person',
      name: SITE_NAME,
      url: SITE_URL,
    },
    keywords: post.tags.join(', '),
  })
}

export function resetMetaTags() {
  updateMetaTags({
    title: `${SITE_NAME} - Full Stack Developer & AI/ML Engineer`,
    description:
      'Joseph Yaw Agyeman - Full Stack Developer & AI/ML Engineer. Professional portfolio showcasing skills, projects, and experience in modern web development.',
    url: SITE_URL,
    image: DEFAULT_IMAGE,
    type: 'website',
  })
  removeJsonLd()
  removeArticleTags()
}
