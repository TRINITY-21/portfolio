import { motion } from 'framer-motion'
import { Calendar, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { BlogPostMeta } from '../../blog/types'

interface BlogCardProps {
  post: BlogPostMeta
  index: number
}

const BlogCard: React.FC<BlogCardProps> = ({ post, index }) => {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to={`/blog/${post.slug}`} className="block group">
        <div className="glass-card overflow-hidden h-full flex flex-col hover:border-line/[0.1] transition-all duration-300">
          {post.coverImage && (
            <div className="relative h-44 bg-steel/20 overflow-hidden">
              <img
                src={post.coverImage}
                alt={post.title}
                loading="lazy"
                onLoad={(e) => e.currentTarget.classList.add('opacity-100')}
                className="w-full h-full object-cover transition-all duration-700 opacity-0 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-obsidian/40" />
            </div>
          )}

          <div className="p-5 sm:p-6 flex flex-col flex-1">
            <div className="flex items-center gap-2 text-silver text-xs font-mono mb-3">
              <Calendar size={12} />
              <span>{formattedDate}</span>
              <span className="text-line/20">|</span>
              <Clock size={12} />
              <span>{post.readingTime}</span>
            </div>

            <h3 className="text-pearl font-semibold text-lg mb-2 group-hover:text-accent transition-colors duration-300 line-clamp-2">
              {post.title}
            </h3>

            <p className="text-silver text-sm leading-relaxed line-clamp-3 mb-4 flex-1">
              {post.description}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span key={tag} className="tech-tag text-xs px-2.5 py-0.5">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default BlogCard
