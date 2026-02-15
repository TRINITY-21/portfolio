import { motion } from 'framer-motion'
import { ArrowRight, Calendar, Clock } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllPostsMeta } from '../blog/utils'
import type { BlogPostMeta } from '../blog/types'

const LatestArticles = () => {
  const [posts, setPosts] = useState<BlogPostMeta[]>([])

  useEffect(() => {
    getAllPostsMeta().then((data) => setPosts(data.slice(0, 3)))
  }, [])

  if (posts.length === 0) return null

  return (
    <section id="blog" className="section-padding scroll-mt-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-dot bg-dot" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-line/[0.06] to-transparent" />

      <div className="container-max relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-end justify-between mb-12 sm:mb-16"
        >
          <div>
            <span className="section-label">// blog</span>
            <h2 className="section-heading">Latest Articles</h2>
            <div className="accent-line mt-6" />
          </div>
          <Link
            to="/blog"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-silver hover:text-accent transition-colors duration-300"
          >
            View all articles
            <ArrowRight size={14} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link to={`/blog/${post.slug}`} className="block group h-full">
                <div className="glass-card p-5 sm:p-6 h-full flex flex-col hover:border-line/[0.1] transition-all duration-300">
                  <div className="flex items-center gap-2 text-silver text-xs font-mono mb-3">
                    <Calendar size={12} />
                    <span>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <span className="text-line/20">|</span>
                    <Clock size={12} />
                    <span>{post.readingTime}</span>
                  </div>

                  <h3 className="text-pearl font-semibold text-lg mb-2 group-hover:text-accent transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-silver text-sm leading-relaxed line-clamp-2 mb-4 flex-1">
                    {post.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="tech-tag text-xs px-2.5 py-0.5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <Link
          to="/blog"
          className="sm:hidden inline-flex items-center gap-2 text-sm font-medium text-silver hover:text-accent transition-colors duration-300 mt-8"
        >
          View all articles
          <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  )
}

export default LatestArticles
