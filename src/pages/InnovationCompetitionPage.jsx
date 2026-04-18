import { Trophy, Lightbulb, Users, CheckCircle2, ArrowRight } from 'lucide-react'
import { useTranslation } from '../i18n'
import PageLayout from '../components/PageLayout'

export default function InnovationCompetitionPage({ theme }) {
  const t = useTranslation()
  const p = t.pages.competition

  return (
    <PageLayout theme={theme} accentColor="cyan">
      {(accent) => (
        <>
          {/* Hero */}
          <section className="fade-up px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="rounded-[32px] border border-white/10 bg-iite-dark/80 p-8 shadow-glass backdrop-blur-xl sm:p-12">
                <span className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] ${accent.badge}`}>
                  <Trophy className="h-4 w-4" />
                  {p.badge}
                </span>
                <h1 className={`mt-6 bg-gradient-to-r bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl lg:text-6xl ${accent.heading}`}>
                  {p.title}
                </h1>
                <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                  {p.description}
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a href="#contact" className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition hover:-translate-y-0.5 ${accent.btn}`}>
                    {p.registerBtn}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Categories */}
          <section className="fade-up px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <h2 className="mb-2 text-sm uppercase tracking-[0.26em] text-iite-cyan">{p.categoriesTag}</h2>
              <h3 className="mb-8 text-3xl font-semibold text-white">{p.categoriesTitle}</h3>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {p.categories.map((cat, i) => (
                  <div key={i} className={`glass-card rounded-[28px] border border-white/10 p-6 shadow-glass transition duration-500 hover:-translate-y-1 ${accent.card}`}>
                    <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 ${accent.icon}`}>
                      {i === 0 ? <Lightbulb className="h-6 w-6" /> : i === 1 ? <Users className="h-6 w-6" /> : <Trophy className="h-6 w-6" />}
                    </div>
                    <h4 className="text-lg font-semibold text-white">{cat.title}</h4>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{cat.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Requirements */}
          <section className="fade-up px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-iite-purple/15 via-iite-purple/5 to-transparent p-8 sm:p-12">
                <h2 className="mb-2 text-sm uppercase tracking-[0.26em] text-iite-cyan">{p.requirementsTag}</h2>
                <h3 className="mb-8 text-3xl font-semibold text-white">{p.requirementsTitle}</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {p.requirements.map((req, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className={`mt-0.5 h-5 w-5 flex-shrink-0 ${accent.icon}`} />
                      <p className="text-slate-300">{req}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Timeline */}
          <section className="fade-up px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <h2 className="mb-2 text-sm uppercase tracking-[0.26em] text-iite-cyan">{p.timelineTag}</h2>
              <h3 className="mb-8 text-3xl font-semibold text-white">{p.timelineTitle}</h3>
              <div className="relative border-l-2 border-white/10 pl-8">
                {p.timeline.map((item, i) => (
                  <div key={i} className="relative mb-10 last:mb-0">
                    <div className={`absolute -left-[41px] top-1 h-4 w-4 rounded-full border-2 border-iite-dark ${accent.dot}`} />
                    <p className={`text-sm font-semibold ${accent.icon}`}>{item.date}</p>
                    <h4 className="mt-1 text-lg font-semibold text-white">{item.label}</h4>
                    <p className="mt-2 text-slate-300">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </PageLayout>
  )
}
