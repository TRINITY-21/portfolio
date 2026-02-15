import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const postsDir = path.resolve(__dirname, '../src/blog/posts')
const outputDir = path.resolve(__dirname, '../public/og')

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

function generateSvg(title, tags, date) {
  const tagList = Array.isArray(tags) ? tags.slice(0, 3) : []
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // Word-wrap title to ~35 chars per line
  const words = title.split(' ')
  const lines = []
  let currentLine = ''
  for (const word of words) {
    if ((currentLine + ' ' + word).trim().length > 35) {
      lines.push(currentLine.trim())
      currentLine = word
    } else {
      currentLine += ' ' + word
    }
  }
  if (currentLine.trim()) lines.push(currentLine.trim())

  const titleLines = lines.slice(0, 3)
  const titleY = 260 - (titleLines.length - 1) * 30

  const tagsSvg = tagList
    .map((tag, i) => {
      const x = 80 + i * 140
      return `
      <rect x="${x}" y="380" width="120" height="28" rx="6" fill="rgba(34,211,238,0.1)" stroke="rgba(34,211,238,0.2)" stroke-width="1"/>
      <text x="${x + 60}" y="398" font-family="monospace" font-size="11" fill="#22d3ee" text-anchor="middle">${escapeHtml(tag)}</text>`
    })
    .join('')

  return `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1200" y2="630" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#09090b"/>
      <stop offset="100%" stop-color="#111113"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="200" y2="0" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#22d3ee"/>
      <stop offset="100%" stop-color="#06b6d4"/>
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.02)" stroke-width="1"/>
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#grid)"/>

  <!-- Top accent line -->
  <rect x="0" y="0" width="1200" height="3" fill="url(#accent)"/>

  <!-- Border -->
  <rect x="60" y="60" width="1080" height="510" rx="16" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" stroke-width="1"/>

  <!-- Logo -->
  <rect x="80" y="80" width="36" height="36" rx="8" fill="rgba(34,211,238,0.1)" stroke="rgba(34,211,238,0.2)" stroke-width="1"/>
  <text x="98" y="104" font-family="monospace" font-size="16" font-weight="bold" fill="#22d3ee" text-anchor="middle">J</text>
  <text x="128" y="104" font-family="sans-serif" font-size="14" fill="#e4e4e7" font-weight="600">joseph<tspan fill="#22d3ee">.dev</tspan></text>

  <!-- Title -->
  ${titleLines
    .map(
      (line, i) =>
        `<text x="80" y="${titleY + i * 56}" font-family="sans-serif" font-size="44" font-weight="bold" fill="#fafafa" letter-spacing="-1">${escapeHtml(line)}</text>`
    )
    .join('\n  ')}

  <!-- Tags -->
  ${tagsSvg}

  <!-- Date -->
  <text x="80" y="540" font-family="monospace" font-size="13" fill="#8c8c8c">${escapeHtml(formattedDate)}</text>

  <!-- URL -->
  <text x="1120" y="540" font-family="monospace" font-size="13" fill="#22d3ee" text-anchor="end">jagyeman.dev/blog</text>
</svg>`
}

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'))
let count = 0

for (const file of files) {
  const content = fs.readFileSync(path.join(postsDir, file), 'utf-8')
  const parsed = parseFrontmatter(content)
  if (!parsed || parsed.meta.published === 'false') continue

  const svg = generateSvg(parsed.meta.title, parsed.meta.tags, parsed.meta.date)
  fs.writeFileSync(path.join(outputDir, `${parsed.meta.slug}.svg`), svg)
  await sharp(Buffer.from(svg)).png().toFile(path.join(outputDir, `${parsed.meta.slug}.png`))
  count++
}

console.log(`OG images generated: ${count} SVG + PNG pairs → public/og/`)
