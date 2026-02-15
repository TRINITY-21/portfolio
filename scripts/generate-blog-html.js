import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const postsDir = path.resolve(__dirname, '../src/blog/posts')
const distDir = path.resolve(__dirname, '../dist')
const templatePath = path.join(distDir, 'index.html')

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) return null

  const meta = {}
  match[1].split('\n').forEach((line) => {
    const [key, ...rest] = line.split(':')
    if (!key) return
    let value = rest.join(':').trim()
    value = value.replace(/^["']|["']$/g, '')
    if (value.startsWith('[')) {
      value = value.replace(/^\[|\]$/g, '').split(',').map((s) => s.trim().replace(/^["']|["']$/g, ''))
    }
    meta[key.trim()] = value
  })

  return { meta }
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

const template = fs.readFileSync(templatePath, 'utf-8')
const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'))
let count = 0

for (const file of files) {
  const content = fs.readFileSync(path.join(postsDir, file), 'utf-8')
  const parsed = parseFrontmatter(content)
  if (!parsed || parsed.meta.published === 'false') continue

  const { title, slug, description, coverImage } = parsed.meta
  const ogImage = coverImage
    ? `https://jagyeman.dev${coverImage}`
    : `https://jagyeman.dev/og/${slug}.png`
  const pageTitle = `${title} | Joseph Yaw Agyeman`
  const url = `https://jagyeman.dev/blog/${slug}`

  let html = template
    // Update title
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(pageTitle)}</title>`)
    // Update meta description
    .replace(
      /<meta name="description" content="[^"]*"/,
      `<meta name="description" content="${escapeHtml(description)}"`
    )
    // Update OG tags
    .replace(
      /<meta property="og:url" content="[^"]*"/,
      `<meta property="og:url" content="${escapeHtml(url)}"`
    )
    .replace(
      /<meta property="og:title" content="[^"]*"/,
      `<meta property="og:title" content="${escapeHtml(title)}"`
    )
    .replace(
      /<meta property="og:description" content="[^"]*"/,
      `<meta property="og:description" content="${escapeHtml(description)}"`
    )
    .replace(
      /<meta property="og:image" content="[^"]*"/,
      `<meta property="og:image" content="${escapeHtml(ogImage)}"`
    )
    // Update Twitter tags
    .replace(
      /<meta name="twitter:title" content="[^"]*"/,
      `<meta name="twitter:title" content="${escapeHtml(title)}"`
    )
    .replace(
      /<meta name="twitter:description" content="[^"]*"/,
      `<meta name="twitter:description" content="${escapeHtml(description)}"`
    )
    .replace(
      /<meta name="twitter:image" content="[^"]*"/,
      `<meta name="twitter:image" content="${escapeHtml(ogImage)}"`
    )
    // Update canonical URL
    .replace(
      /<link rel="canonical" href="[^"]*"/,
      `<link rel="canonical" href="${escapeHtml(url)}"`
    )

  const outputDir = path.join(distDir, 'blog', slug)
  fs.mkdirSync(outputDir, { recursive: true })
  fs.writeFileSync(path.join(outputDir, 'index.html'), html)
  count++
}

console.log(`Blog HTML generated: ${count} pages → dist/blog/*/index.html`)
