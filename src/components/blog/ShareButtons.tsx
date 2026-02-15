import { Check, Copy, Linkedin, Twitter } from 'lucide-react'
import { useState } from 'react'

interface ShareButtonsProps {
  title: string
  slug: string
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ title, slug }) => {
  const [copied, setCopied] = useState(false)
  const url = `https://jagyeman.dev/blog/${slug}`
  const encodedTitle = encodeURIComponent(title)
  const encodedUrl = encodeURIComponent(url)

  const share = (shareUrl: string) => {
    window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=500')
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const btnClass =
    'w-10 h-10 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center border border-line/[0.08] bg-steel/30 text-silver hover:text-accent hover:border-accent/20 hover:bg-accent/[0.06] transition-all duration-200'

  return (
    <div className="flex items-center gap-2">
      <span className="text-silver/40 text-xs font-mono tracking-wide">Share on</span>
      <button
        onClick={() => share(`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`)}
        className={btnClass}
        aria-label="Share on X"
      >
        <Twitter size={15} />
      </button>
      <button
        onClick={() => share(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`)}
        className={btnClass}
        aria-label="Share on LinkedIn"
      >
        <Linkedin size={15} />
      </button>
      <button
        onClick={handleCopy}
        className={btnClass}
        aria-label="Copy link"
      >
        {copied ? <Check size={15} className="text-accent" /> : <Copy size={15} />}
      </button>
    </div>
  )
}

export default ShareButtons
