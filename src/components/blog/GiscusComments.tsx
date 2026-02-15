import { useEffect, useRef } from 'react'

interface GiscusCommentsProps {
  slug: string
}

const GiscusComments: React.FC<GiscusCommentsProps> = ({ slug }) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    // Clear previous instance
    ref.current.innerHTML = ''

    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.setAttribute('data-repo', import.meta.env.VITE_GISCUS_REPO)
    script.setAttribute('data-repo-id', import.meta.env.VITE_GISCUS_REPO_ID)
    script.setAttribute('data-category', import.meta.env.VITE_GISCUS_CATEGORY)
    script.setAttribute('data-category-id', import.meta.env.VITE_GISCUS_CATEGORY_ID)
    script.setAttribute('data-mapping', 'pathname')
    script.setAttribute('data-strict', '0')
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata', '0')
    script.setAttribute('data-input-position', 'bottom')
    script.setAttribute('data-theme', 'transparent_dark')
    script.setAttribute('data-lang', 'en')
    script.setAttribute('data-loading', 'lazy')
    script.crossOrigin = 'anonymous'
    script.async = true

    ref.current.appendChild(script)
  }, [slug])

  return (
    <div className="mt-12 pt-8 border-t border-line/[0.06]">
      <h3 className="text-pearl font-semibold text-lg mb-6 tracking-tight">Comments</h3>
      <div ref={ref} className="giscus" />
    </div>
  )
}

export default GiscusComments
