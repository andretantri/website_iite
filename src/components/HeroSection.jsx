import { ArrowRight, CalendarDays, Globe2, Sparkles, Trophy, BookOpen, Mic2, Leaf, Store } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from '../i18n'

const activities = [
  { key: 'competition', to: '/innovation_competition', icon: Trophy, color: 'text-iite-cyan' },
  { key: 'proceeding', to: '/proceeding', icon: BookOpen, color: 'text-rose-400' },
  { key: 'seminar', to: '/international_seminar', icon: Mic2, color: 'text-iite-purple' },
  { key: 'greenyouth', to: '/greenyouth', icon: Leaf, color: 'text-iite-green' },
  { key: 'msme', to: '/msme', icon: Store, color: 'text-amber-400' },
]

export default function HeroSection() {
  const t = useTranslation()

  return (
    <section id="hero" className="fade-up relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
      {/* Animated Background */}
      <div className="hero-bg-animated" aria-hidden="true">
        <div className="hero-orb hero-orb--cyan" />
        <div className="hero-orb hero-orb--purple" />
        <div className="hero-orb hero-orb--green" />
        <div className="hero-orb hero-orb--pink" />
        <div className="hero-grid" />
        <div className="hero-particles">
          <div className="hero-particle" />
          <div className="hero-particle" />
          <div className="hero-particle" />
          <div className="hero-particle" />
          <div className="hero-particle" />
          <div className="hero-particle" />
          <div className="hero-particle" />
          <div className="hero-particle" />
          <div className="hero-particle" />
          <div className="hero-particle" />
        </div>
        <div className="hero-shimmer-line" />
        <div className="hero-shimmer-line" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-8 rounded-[32px] border border-white/10 bg-iite-dark/80 p-8 shadow-glass backdrop-blur-xl sm:p-12">
          <div className="flex flex-col gap-6 text-center sm:text-left">
            <span className="inline-flex items-center justify-center rounded-full border border-iite-purple/30 bg-iite-purple/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.26em] text-iite-cyan sm:self-start">
              {t.hero.badge}
            </span>
            <div>
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                IITE 2026
              </h1>
              <p className="mt-4 max-w-3xl text-base text-slate-300 sm:text-lg">
                {t.hero.description}
              </p>
            </div>
          </div>

          <div className="grid gap-6 rounded-3xl bg-gradient-to-br from-iite-purple/15 via-iite-purple/10 to-transparent p-6 sm:grid-cols-2 md:grid-cols-3">
            <div className="flex items-start gap-4 rounded-3xl border border-white/10 bg-white/5 p-4">
              <CalendarDays className="h-6 w-6 text-iite-cyan" />
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">{t.hero.time}</p>
                <p className="mt-1 font-semibold text-white">22 - 23 Juli 2026</p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-3xl border border-white/10 bg-white/5 p-4">
              <Globe2 className="h-6 w-6 text-iite-green" />
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">{t.hero.location}</p>
                <p className="mt-1 font-semibold text-white">Online (Zoom Hybrid)</p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-3xl border border-white/10 bg-white/5 p-4">
              <Sparkles className="h-6 w-6 text-iite-cyan" />
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">{t.hero.organizer}</p>
                <p className="mt-1 font-semibold text-white">Politeknik Indonusa Surakarta</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
              {t.hero.summary}
            </p>
            <a href="#contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-iite-cyan px-6 py-3 text-sm font-semibold text-iite-dark transition hover:-translate-y-0.5 hover:bg-iite-cyan/80">
              {t.hero.cta}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          {/* Activities Box */}
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-glass backdrop-blur-xl sm:p-6">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-300">{t.home.activitiesTag}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {activities.map(({ key, to, icon: Icon, color }) => (
                <Link
                  key={key}
                  to={to}
                  className="group flex flex-col items-center gap-3 rounded-3xl bg-slate-950/50 px-4 py-5 text-center ring-1 ring-white/10 transition duration-300 hover:bg-slate-950/70 hover:ring-white/20 hover:-translate-y-0.5"
                >
                  <Icon className={`h-6 w-6 ${color}`} />
                  <p className="text-sm font-semibold text-white leading-tight">{t.home.cards[key].title}</p>
                  <span className={`text-xs font-medium ${color} opacity-0 transition group-hover:opacity-100`}>
                    {t.home.cards[key].cta} →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
