import { motion, useScroll, useSpring } from 'framer-motion'
import { useLocation } from 'react-router-dom'

const ReadingProgress = () => {
  const { pathname } = useLocation()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  // Only show on individual blog post pages
  const isBlogPost = /^\/blog\/.+/.test(pathname)
  if (!isBlogPost) return null

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-accent origin-left z-[60]"
    />
  )
}

export default ReadingProgress
