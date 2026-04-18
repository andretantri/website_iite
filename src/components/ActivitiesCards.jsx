import { Link } from 'react-router-dom'
import { Trophy, BookOpen, Mic2, Leaf, Store, ArrowRight } from 'lucide-react'
import { useTranslation } from '../i18n'

const activities = [
  { key: 'competition', to: '/innovation_competition', icon: Trophy, accent: 'cyan' },
  { key: 'proceeding', to: '/proceeding', icon: BookOpen, accent: 'rose' },
  { key: 'seminar', to: '/international_seminar', icon: Mic2, accent: 'purple' },
  { key: 'greenyouth', to: '/greenyouth', icon: Leaf, accent: 'emerald' },
  { key: 'msme', to: '/msme', icon: Store, accent: 'amber' },
]

const accentStyles = {
  cyan: { border: 'group-hover:border-iite-cyan/40', icon: 'bg-iite-cyan/10 text-iite-cyan', arrow: 'text-iite-cyan' },
  rose: { border: 'group-hover:border-rose-400/40', icon: 'bg-rose-400/10 text-rose-400', arrow: 'text-rose-400' },
  purple: { border: 'group-hover:border-iite-purple/40', icon: 'bg-iite-purple/10 text-iite-purple', arrow: 'text-iite-purple' },
  emerald: { border: 'group-hover:border-iite-green/40', icon: 'bg-iite-green/10 text-iite-green', arrow: 'text-iite-green' },
  amber: { border: 'group-hover:border-amber-400/40', icon: 'bg-amber-400/10 text-amber-400', arrow: 'text-amber-400' },
}

export default function ActivitiesCards() {
  const t = useTranslation()

  return (
    <section className="fade-up px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.26em] text-iite-cyan">{t.home.activitiesTag}</p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">{t.home.activitiesTitle}</h2>
          <p className="mt-4 mx-auto max-w-2xl text-slate-300 sm:text-lg">{t.home.activitiesDesc}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activities.map(({ key, to, icon: Icon, accent }) => {
            const style = accentStyles[accent]
            return (
              <Link
                key={key}
                to={to}
                className={`group glass-card rounded-[28px] border border-white/10 p-6 shadow-glass transition duration-500 hover:-translate-y-1 ${style.border}`}
              >
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${style.icon}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-white">{t.home.cards[key].title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{t.home.cards[key].desc}</p>
                <div className={`mt-5 inline-flex items-center gap-2 text-sm font-medium ${style.arrow} transition group-hover:gap-3`}>
                  {t.home.cards[key].cta}
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
