import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Search } from 'lucide-react'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { getAllPostsMeta } from '../blog/utils'
import type { BlogPostMeta } from '../blog/types'
import BlogCard from '../components/blog/BlogCard'

const TAG_CATEGORIES: Record<string, string[]> = {
  'AI & ML': ['AI', 'Agents', 'LLMs', 'Machine Learning', 'RAG', 'Vector Databases'],
  'Backend': ['Backend', 'Django', 'Python', 'REST API'],
  'Frontend': ['Frontend', 'TypeScript', 'React'],
  'Engineering': ['Software Engineering', 'Clean Code', 'Best Practices', 'Architecture'],
  'DevOps': ['DevOps', 'CI/CD', 'GitHub Actions', 'Docker', 'Kubernetes'],
  'Career': ['Career', 'Productivity', 'Full Stack', 'Developer Tools'],
}

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPostMeta[]>([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const scrollRef = useRef<HTMLDivElement>(null)
  const POSTS_PER_PAGE = 9

  useEffect(() => {
    document.title = 'Blog | Joseph Yaw Agyeman'
    getAllPostsMeta().then((data) => {
      setPosts(data)
      setLoading(false)
    })
    return () => {
      document.title = 'Joseph Yaw Agyeman - Full Stack Developer & AI/ML Engineer'
    }
  }, [])

  const activeCategories = useMemo(() => {
    const postTags = new Set<string>()
    posts.forEach((post) => post.tags.forEach((tag) => postTags.add(tag)))
    return Object.entries(TAG_CATEGORIES)
      .filter(([, tags]) => tags.some((tag) => postTags.has(tag)))
      .map(([category]) => category)
  }, [posts])

  const filteredPosts = useMemo(() => {
    let result = posts

    if (activeFilter !== 'all') {
      const categoryTags = TAG_CATEGORIES[activeFilter] || []
      result = result.filter((post) =>
        post.tags.some((tag) => categoryTags.includes(tag))
      )
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(q) ||
          post.description.toLowerCase().includes(q) ||
          post.tags.some((tag) => tag.toLowerCase().includes(q))
      )
    }

    return result
  }, [posts, activeFilter, searchQuery])

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [activeFilter, searchQuery])

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  )

  return (
    <section className="section-padding min-h-screen scroll-mt-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-line/[0.06] to-transparent" />

      <div className="container-max relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 sm:mb-16"
        >
          <span className="section-label">// blog</span>
          <h1 className="section-heading">Articles & Insights</h1>
          <div className="accent-line mt-6" />
          <p className="text-silver text-base max-w-2xl mt-6 leading-relaxed">
            Thoughts on software architecture, web development, and lessons from building production systems.
          </p>
        </motion.div>

        {/* Toolbar — Search + Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-10"
        >
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-1.5 rounded-xl bg-steel/[0.35] border border-line/[0.06] backdrop-blur-sm">
            {/* Search */}
            <div className="relative shrink-0 sm:w-52 lg:w-64">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-silver/40" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-line/[0.04] border border-line/[0.04] text-xs text-pearl placeholder:text-silver/30 focus:outline-none focus:border-accent/20 focus:bg-accent/[0.03] transition-all duration-300 font-mono"
              />
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-5 bg-line/[0.08] shrink-0" />

            {/* Filters */}
            {activeCategories.length > 0 && (
              <div
                ref={scrollRef}
                className="flex items-center gap-1 overflow-x-auto scrollbar-hide"
              >
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all duration-300 whitespace-nowrap shrink-0 ${
                    activeFilter === 'all'
                      ? 'bg-accent/10 text-accent shadow-sm shadow-accent/5'
                      : 'text-silver hover:text-pearl hover:bg-line/[0.04]'
                  }`}
                >
                  All
                </button>
                {activeCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveFilter(category)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all duration-300 whitespace-nowrap shrink-0 ${
                      activeFilter === category
                        ? 'bg-accent/10 text-accent shadow-sm shadow-accent/5'
                        : 'text-silver hover:text-pearl hover:bg-line/[0.04]'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}

            {/* Count badge */}
            {activeFilter !== 'all' && (
              <div className="hidden sm:flex items-center shrink-0 ml-auto pr-1">
                <span className="text-[10px] font-mono text-accent/60 bg-accent/[0.06] px-2 py-0.5 rounded-md">
                  {filteredPosts.length}
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Posts Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-card h-80 animate-pulse">
                <div className="h-44 bg-steel/20" />
                <div className="p-5 space-y-3">
                  <div className="h-3 bg-steel/30 rounded w-1/3" />
                  <div className="h-4 bg-steel/30 rounded w-3/4" />
                  <div className="h-3 bg-steel/30 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredPosts.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-silver text-center py-20"
          >
            No posts found.
          </motion.p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedPosts.map((post, index) => (
                <BlogCard key={post.slug} post={post} index={index} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                  className="w-9 h-9 rounded-lg flex items-center justify-center border border-line/[0.06] bg-steel/[0.2] text-silver hover:text-accent hover:border-accent/20 disabled:opacity-30 disabled:pointer-events-none transition-all duration-200"
                >
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-9 h-9 rounded-lg text-xs font-mono font-medium transition-all duration-200 ${
                      currentPage === page
                        ? 'bg-accent/10 text-accent border border-accent/20 shadow-sm shadow-accent/5'
                        : 'text-silver border border-line/[0.06] bg-steel/[0.2] hover:text-pearl hover:border-line/[0.1]'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                  className="w-9 h-9 rounded-lg flex items-center justify-center border border-line/[0.06] bg-steel/[0.2] text-silver hover:text-accent hover:border-accent/20 disabled:opacity-30 disabled:pointer-events-none transition-all duration-200"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}

export default BlogPage
