import React from 'react'
import { Video } from 'lucide-react'

export function getYouTubeEmbedUrl(url) {
  if (!url || typeof url !== 'string') return null
  const trimmed = url.trim()
  if (!trimmed) return null
  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i
  const match = trimmed.match(regExp)
  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}`
  }
  if (trimmed.includes('youtube.com/embed/')) {
    return trimmed
  }
  return null
}

export default function YouTubeEmbed({ url, title, subtitle, accentColor = 'cyan', className = '' }) {
  const embedUrl = getYouTubeEmbedUrl(url)
  if (!embedUrl) return null

  const borderAccents = {
    cyan: 'border-iite-cyan/30 shadow-iite-cyan/10 hover:border-iite-cyan/50',
    rose: 'border-rose-400/30 shadow-rose-400/10 hover:border-rose-400/50',
    emerald: 'border-emerald-400/30 shadow-emerald-400/10 hover:border-emerald-400/50',
    amber: 'border-amber-400/30 shadow-amber-400/10 hover:border-amber-400/50',
    purple: 'border-purple-400/30 shadow-purple-400/10 hover:border-purple-400/50',
  }

  const badgeAccents = {
    cyan: 'border-iite-cyan/30 bg-iite-cyan/10 text-iite-cyan',
    rose: 'border-rose-400/30 bg-rose-400/10 text-rose-400',
    emerald: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-400',
    amber: 'border-amber-400/30 bg-amber-400/10 text-amber-400',
    purple: 'border-purple-400/30 bg-purple-400/10 text-purple-400',
  }

  return (
    <section className={`fade-up px-4 py-12 sm:px-6 lg:px-8 ${className}`}>
      <div className="mx-auto max-w-7xl">
        {(subtitle || title) && (
          <div className="mb-6">
            {subtitle && (
              <span className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.2em] mb-2 ${badgeAccents[accentColor] || badgeAccents.cyan}`}>
                <Video className="h-3.5 w-3.5" />
                {subtitle}
              </span>
            )}
            {title && (
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {title}
              </h3>
            )}
          </div>
        )}

        <div className={`relative overflow-hidden rounded-[28px] border bg-slate-950/80 p-2 sm:p-3 shadow-2xl backdrop-blur-xl transition duration-300 ${borderAccents[accentColor] || borderAccents.cyan}`}>
          <div className="relative aspect-video w-full overflow-hidden rounded-[20px]">
            <iframe
              src={embedUrl}
              title={title || "YouTube Video"}
              className="absolute inset-0 h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; webshare"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  )
}
