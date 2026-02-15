import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Calendar, Clock } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Link, useParams } from 'react-router-dom'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import { getAdjacentPosts, getPostBySlug } from '../blog/utils'
import type { BlogPost, BlogPostMeta } from '../blog/types'
import { updateBlogPostMeta, resetMetaTags } from '../utils/seo'
import CodeBlock from '../components/blog/CodeBlock'
import GiscusComments from '../components/blog/GiscusComments'
import ReadingProgress from '../components/blog/ReadingProgress'
import RelatedPosts from '../components/blog/RelatedPosts'
import ShareButtons from '../components/blog/ShareButtons'
import TableOfContents from '../components/blog/TableOfContents'

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [adjacent, setAdjacent] = useState<{ prev: BlogPostMeta | null; next: BlogPostMeta | null }>({ prev: null, next: null })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    getPostBySlug(slug).then((data) => {
      setPost(data)
      setLoading(false)
    })
    getAdjacentPosts(slug).then(setAdjacent)
  }, [slug])

  useEffect(() => {
    if (post) {
      updateBlogPostMeta({
        title: post.title,
        slug: post.slug,
        description: post.description,
        date: post.date,
        updated: post.updated,
        tags: post.tags,
        coverImage: post.coverImage,
      })
    }
    return () => {
      resetMetaTags()
    }
  }, [post])

  const formattedDate = post
    ? new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ''

  if (loading) {
    return (
      <section className="section-padding min-h-screen">
        <div className="container-max max-w-3xl">
          <div className="animate-pulse space-y-6">
            <div className="h-4 bg-steel/30 rounded w-24" />
            <div className="h-8 bg-steel/30 rounded w-3/4" />
            <div className="h-3 bg-steel/30 rounded w-1/3" />
            <div className="h-64 bg-steel/20 rounded-2xl" />
            <div className="space-y-3">
              <div className="h-3 bg-steel/30 rounded" />
              <div className="h-3 bg-steel/30 rounded" />
              <div className="h-3 bg-steel/30 rounded w-5/6" />
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (!post) {
    return (
      <section className="section-padding min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-pearl mb-4">Post not found</h1>
          <p className="text-silver mb-8">The blog post you're looking for doesn't exist.</p>
          <Link to="/blog" className="btn-primary px-6 py-3 inline-block">
            Back to Blog
          </Link>
        </div>
      </section>
    )
  }

  return (
    <>
    <ReadingProgress />
    <section className="section-padding min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-grid" />

      <div className="container-max max-w-3xl relative z-10">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-silver hover:text-accent text-sm font-medium transition-colors duration-300 mb-10"
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Link>
        </motion.div>

        {/* Post Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags.map((tag) => (
              <span key={tag} className="tech-tag text-xs px-2.5 py-0.5">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-pearl mb-4 text-balance">
            {post.title}
          </h1>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4 text-silver text-sm font-mono">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                {post.readingTime}
              </span>
            </div>
            <ShareButtons title={post.title} slug={post.slug} />
          </div>

          <div className="accent-line mt-6" />
        </motion.header>

        {/* Cover Image */}
        {post.coverImage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-10 rounded-2xl overflow-hidden"
          >
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full object-cover"
            />
          </motion.div>
        )}

        {/* Table of Contents */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <TableOfContents content={post.content} />
        </motion.div>

        {/* Post Content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="prose prose-lg max-w-none"
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSlug]}
            components={{
              code: CodeBlock as any,
            }}
          >
            {post.content}
          </ReactMarkdown>
        </motion.article>

        {/* Prev / Next Navigation */}
        {(adjacent.prev || adjacent.next) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-12 pt-8 border-t border-line/[0.06] grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {adjacent.prev ? (
              <Link
                to={`/blog/${adjacent.prev.slug}`}
                className="group glass-card p-4 hover:border-line/[0.1] transition-all duration-300"
              >
                <span className="text-[11px] font-mono text-silver/40 uppercase tracking-wider flex items-center gap-1 mb-2">
                  <ArrowLeft size={11} /> Previous
                </span>
                <p className="text-sm text-pearl font-medium group-hover:text-accent transition-colors duration-200 line-clamp-2">
                  {adjacent.prev.title}
                </p>
              </Link>
            ) : (
              <div />
            )}
            {adjacent.next ? (
              <Link
                to={`/blog/${adjacent.next.slug}`}
                className="group glass-card p-4 hover:border-line/[0.1] transition-all duration-300 text-right"
              >
                <span className="text-[11px] font-mono text-silver/40 uppercase tracking-wider flex items-center justify-end gap-1 mb-2">
                  Next <ArrowRight size={11} />
                </span>
                <p className="text-sm text-pearl font-medium group-hover:text-accent transition-colors duration-200 line-clamp-2">
                  {adjacent.next.title}
                </p>
              </Link>
            ) : (
              <div />
            )}
          </motion.div>
        )}

        {/* Related Posts */}
        <RelatedPosts currentSlug={post.slug} currentTags={post.tags} />

        {/* Comments */}
        <GiscusComments slug={post.slug} />

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 pt-6 border-t border-line/[0.06]"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-silver hover:text-accent text-sm font-medium transition-colors duration-300"
          >
            <ArrowLeft size={16} />
            All articles
          </Link>
        </motion.div>
      </div>
    </section>
    </>
  )
}

export default BlogPostPage
