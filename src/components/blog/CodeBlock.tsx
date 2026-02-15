import { Check, Copy } from 'lucide-react'
import React, { useState } from 'react'

interface CodeBlockProps {
  className?: string
  children?: React.ReactNode
}

const CodeBlock: React.FC<CodeBlockProps> = ({ className, children, ...props }) => {
  const [copied, setCopied] = useState(false)
  const match = /language-(\w+)/.exec(className || '')
  const codeString = String(children).replace(/\n$/, '')

  if (!match) {
    return (
      <code
        className="bg-steel/40 text-accent px-1.5 py-0.5 rounded text-sm font-mono"
        {...props}
      >
        {children}
      </code>
    )
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeString)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group glass-card !rounded-xl overflow-hidden my-6 !bg-[rgba(20,20,22,0.8)]">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-line/[0.06]">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-[7px] h-[7px] rounded-full bg-red-500/70" />
            <span className="w-[7px] h-[7px] rounded-full bg-yellow-500/70" />
            <span className="w-[7px] h-[7px] rounded-full bg-green-500/70" />
          </div>
          <span className="text-silver/60 text-xs font-mono ml-2">{match[1]}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-silver/60 hover:text-accent text-xs font-mono transition-colors duration-200"
        >
          {copied ? (
            <>
              <Check size={12} />
              Copied
            </>
          ) : (
            <>
              <Copy size={12} />
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
        <code className={className} {...props}>
          {children}
        </code>
      </pre>
    </div>
  )
}

export default CodeBlock
