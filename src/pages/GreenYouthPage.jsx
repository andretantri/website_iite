import { Leaf, Sprout, TreePine, Recycle, ArrowRight, CheckCircle2 } from 'lucide-react'
import { useTranslation } from '../i18n'
import PageLayout from '../components/PageLayout'

export default function GreenYouthPage({ theme }) {
  const t = useTranslation()
  const p = t.pages.greenyouth

  return (
    <PageLayout theme={theme} accentColor="emerald">
      {(accent) => (
        <>
          <section className="fade-up px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="rounded-[32px] border border-white/10 bg-iite-dark/80 p-8 shadow-glass backdrop-blur-xl sm:p-12">
                <span className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] ${accent.badge}`}>
                  <Leaf className="h-4 w-4" />
                  {p.badge}
                </span>
                <h1 className={`mt-6 bg-gradient-to-r bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl lg:text-6xl ${accent.heading}`}>
                  {p.title}
                </h1>
                <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">{p.description}</p>
                <div className="mt-8">
                  <a href="#contact" className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition hover:-translate-y-0.5 ${accent.btn}`}>
                    {p.joinBtn} <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section className="fade-up px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <h2 className="mb-2 text-sm uppercase tracking-[0.26em] text-iite-green">{p.programsTag}</h2>
              <h3 className="mb-8 text-3xl font-semibold text-white">{p.programsTitle}</h3>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {p.programs.map((prog, i) => (
                  <div key={i} className={`glass-card rounded-[28px] border border-white/10 p-6 shadow-glass transition duration-500 hover:-translate-y-1 ${accent.card}`}>
                    <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 ${accent.icon}`}>
                      {i === 0 ? <Sprout className="h-6 w-6" /> : i === 1 ? <TreePine className="h-6 w-6" /> : <Recycle className="h-6 w-6" />}
                    </div>
                    <h4 className="text-lg font-semibold text-white">{prog.title}</h4>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{prog.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="fade-up px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent p-8 sm:p-12">
                <h2 className="mb-2 text-sm uppercase tracking-[0.26em] text-iite-green">{p.benefitsTag}</h2>
                <h3 className="mb-8 text-3xl font-semibold text-white">{p.benefitsTitle}</h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {p.benefits.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className={`mt-0.5 h-5 w-5 flex-shrink-0 ${accent.icon}`} />
                      <p className="text-slate-300">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="fade-up px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <h2 className="mb-2 text-sm uppercase tracking-[0.26em] text-iite-green">{p.targetTag}</h2>
              <h3 className="mb-8 text-3xl font-semibold text-white">{p.targetTitle}</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {p.targets.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <Leaf className={`h-5 w-5 flex-shrink-0 ${accent.icon}`} />
                    <p className="text-slate-300">{item}</p>
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
