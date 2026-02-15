import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const postsDir = path.resolve(__dirname, '../src/blog/posts')
const outputPath = path.resolve(__dirname, '../public/rss.xml')

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) return null

  const meta = {}
  match[1].split('\n').forEach((line) => {
    const [key, ...rest] = line.split(':')
    if (!key) return
    let value = rest.join(':').trim()
    // Remove quotes
    value = value.replace(/^["']|["']$/g, '')
    // Handle arrays
    if (value.startsWith('[')) {
      value = value.replace(/^\[|\]$/g, '').split(',').map((s) => s.trim().replace(/^["']|["']$/g, ''))
    }
    meta[key.trim()] = value
  })

  return { meta, body: match[2] }
}

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'))
const posts = []

for (const file of files) {
  const content = fs.readFileSync(path.join(postsDir, file), 'utf-8')
  const parsed = parseFrontmatter(content)
  if (!parsed || parsed.meta.published === 'false') continue

  posts.push({
    title: parsed.meta.title,
    slug: parsed.meta.slug,
    date: parsed.meta.date,
    description: parsed.meta.description,
    tags: Array.isArray(parsed.meta.tags) ? parsed.meta.tags : [],
  })
}

posts.sort((a, b) => new Date(b.date) - new Date(a.date))

const rssItems = posts
  .map(
    (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>https://jagyeman.dev/blog/${post.slug}</link>
      <guid isPermaLink="true">https://jagyeman.dev/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.description)}</description>${post.tags.map((t) => `\n      <category>${escapeXml(t)}</category>`).join('')}
    </item>`
  )
  .join('\n')

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Joseph Yaw Agyeman - Blog</title>
    <link>https://jagyeman.dev/blog</link>
    <description>Articles on software engineering, AI/ML, system design, and building production systems.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://jagyeman.dev/rss.xml" rel="self" type="application/rss+xml"/>
${rssItems}
  </channel>
</rss>
`

fs.writeFileSync(outputPath, rss)
console.log(`RSS feed generated: ${posts.length} posts → public/rss.xml`)
