import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllPostsMeta } from '../../blog/utils'
import type { BlogPostMeta } from '../../blog/types'

interface RelatedPostsProps {
  currentSlug: string
  currentTags: string[]
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ currentSlug, currentTags }) => {
  const [related, setRelated] = useState<BlogPostMeta[]>([])

  useEffect(() => {
    getAllPostsMeta().then((posts) => {
      const others = posts.filter((p) => p.slug !== currentSlug)

      // Score by tag overlap
      const scored = others.map((post) => ({
        post,
        score: post.tags.filter((t) => currentTags.includes(t)).length,
      }))

      scored.sort((a, b) => b.score - a.score)
      setRelated(scored.slice(0, 3).map((s) => s.post))
    })
  }, [currentSlug, currentTags])

  if (related.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mt-16 pt-10 border-t border-line/[0.06]"
    >
      <h3 className="text-sm font-mono text-silver/50 uppercase tracking-wider mb-6">
        Related articles
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {related.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="group glass-card p-4 hover:border-line/[0.1] transition-all duration-300"
          >
            <p className="text-pearl text-sm font-medium group-hover:text-accent transition-colors duration-200 line-clamp-2 mb-2">
              {post.title}
            </p>
            <span className="inline-flex items-center gap-1 text-xs text-silver/50 group-hover:text-accent/60 transition-colors duration-200">
              Read <ArrowRight size={11} />
            </span>
          </Link>
        ))}
      </div>
    </motion.div>
  )
}

export default RelatedPosts
