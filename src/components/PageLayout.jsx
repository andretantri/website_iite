import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, CalendarDays, Globe2, Sparkles } from 'lucide-react'
import { useTranslation } from '../i18n'

export default function PageLayout({ theme, accentColor, children }) {
  const t = useTranslation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const accentClasses = {
    cyan: {
      badge: 'border-iite-cyan/30 bg-iite-cyan/10 text-iite-cyan',
      glow: 'from-cyan-500/20 via-transparent to-transparent',
      btn: 'bg-iite-cyan text-iite-dark hover:bg-iite-cyan/80',
      btnOutline: 'border-iite-cyan/50 bg-iite-cyan/10 text-iite-cyan hover:border-iite-cyan hover:bg-iite-cyan/20',
      heading: 'from-iite-cyan to-white',
      icon: 'text-iite-cyan',
      card: 'hover:border-iite-cyan/40',
      dot: 'bg-iite-cyan',
    },
    emerald: {
      badge: 'border-iite-green/30 bg-iite-green/10 text-iite-green',
      glow: 'from-emerald-500/20 via-transparent to-transparent',
      btn: 'bg-iite-green text-iite-dark hover:bg-iite-green/80',
      btnOutline: 'border-iite-green/50 bg-iite-green/10 text-iite-green hover:border-iite-green hover:bg-iite-green/20',
      heading: 'from-iite-green to-white',
      icon: 'text-iite-green',
      card: 'hover:border-iite-green/40',
      dot: 'bg-iite-green',
    },
    purple: {
      badge: 'border-iite-purple/30 bg-iite-purple/10 text-iite-purple',
      glow: 'from-purple-500/20 via-transparent to-transparent',
      btn: 'bg-iite-purple text-white hover:bg-iite-purple/80',
      btnOutline: 'border-iite-purple/50 bg-iite-purple/10 text-iite-purple hover:border-iite-purple hover:bg-iite-purple/20',
      heading: 'from-iite-purple to-white',
      icon: 'text-iite-purple',
      card: 'hover:border-iite-purple/40',
      dot: 'bg-iite-purple',
    },
    amber: {
      badge: 'border-amber-400/30 bg-amber-400/10 text-amber-400',
      glow: 'from-amber-500/20 via-transparent to-transparent',
      btn: 'bg-amber-400 text-iite-dark hover:bg-amber-400/80',
      btnOutline: 'border-amber-400/50 bg-amber-400/10 text-amber-400 hover:border-amber-400 hover:bg-amber-400/20',
      heading: 'from-amber-400 to-white',
      icon: 'text-amber-400',
      card: 'hover:border-amber-400/40',
      dot: 'bg-amber-400',
    },
    rose: {
      badge: 'border-rose-400/30 bg-rose-400/10 text-rose-400',
      glow: 'from-rose-500/20 via-transparent to-transparent',
      btn: 'bg-rose-400 text-iite-dark hover:bg-rose-400/80',
      btnOutline: 'border-rose-400/50 bg-rose-400/10 text-rose-400 hover:border-rose-400 hover:bg-rose-400/20',
      heading: 'from-rose-400 to-white',
      icon: 'text-rose-400',
      card: 'hover:border-rose-400/40',
      dot: 'bg-rose-400',
    },
  }

  const accent = accentClasses[accentColor] || accentClasses.cyan

  return (
    <main className="relative overflow-hidden">
      {/* Background glow */}
      <div className={`pointer-events-none absolute inset-0 bg-gradient-radial ${accent.glow}`} aria-hidden="true" />

      {/* Back to home */}
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
        <Link
          to="/"
          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition hover:-translate-y-0.5 ${accent.btnOutline}`}
        >
          <ArrowLeft className="h-4 w-4" />
          {t.pages.backHome}
        </Link>
      </div>

      {typeof children === 'function' ? children(accent) : children}
    </main>
  )
}
