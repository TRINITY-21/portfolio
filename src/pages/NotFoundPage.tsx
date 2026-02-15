import { motion } from 'framer-motion'
import { ArrowLeft, Home } from 'lucide-react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => (
  <section className="section-padding min-h-screen flex items-center justify-center relative overflow-hidden">
    <div className="absolute inset-0 bg-grid" />

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="text-center relative z-10"
    >
      <p className="text-accent font-mono text-sm mb-4">404</p>
      <h1 className="text-4xl sm:text-5xl font-bold text-pearl mb-4 tracking-tight">
        Page not found
      </h1>
      <p className="text-silver text-base max-w-md mx-auto mb-10 leading-relaxed">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex items-center justify-center gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 transition-all duration-300"
        >
          <Home size={15} />
          Home
        </Link>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg text-silver border border-line/[0.08] hover:text-pearl hover:border-line/[0.15] transition-all duration-300"
        >
          <ArrowLeft size={15} />
          Blog
        </Link>
      </div>
    </motion.div>
  </section>
)

export default NotFoundPage
