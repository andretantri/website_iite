import { Mic2, Globe2, Users, CalendarDays, ArrowRight } from 'lucide-react'
import { useTranslation } from '../i18n'
import PageLayout from '../components/PageLayout'

export default function InternationalSeminarPage({ theme }) {
  const t = useTranslation()
  const p = t.pages.seminar

  return (
    <PageLayout theme={theme} accentColor="purple">
      {(accent) => (
        <>
          {/* Hero */}
          <section className="fade-up px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="rounded-[32px] border border-white/10 bg-iite-dark/80 p-8 shadow-glass backdrop-blur-xl sm:p-12">
                <span className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] ${accent.badge}`}>
                  <Mic2 className="h-4 w-4" />
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
                    {p.joinBtn}
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Speakers */}
          <section className="fade-up px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <h2 className="mb-2 text-sm uppercase tracking-[0.26em] text-iite-purple">{p.speakersTag}</h2>
              <h3 className="mb-8 text-3xl font-semibold text-white">{p.speakersTitle}</h3>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {p.speakers.map((speaker, i) => (
                  <div key={i} className={`glass-card rounded-[28px] border border-white/10 p-6 shadow-glass transition duration-500 hover:-translate-y-1 ${accent.card}`}>
                    <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-iite-purple/30 to-iite-purple/10 text-xl font-bold ${accent.icon}`}>
                      {speaker.name.charAt(0)}
                    </div>
                    <h4 className="text-lg font-semibold text-white">{speaker.name}</h4>
                    <p className="mt-1 text-sm text-iite-purple">{speaker.role}</p>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{speaker.topic}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Agenda */}
          <section className="fade-up px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="rounded-[32px] border border-white/10 bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-transparent p-8 sm:p-12">
                <h2 className="mb-2 text-sm uppercase tracking-[0.26em] text-iite-purple">{p.agendaTag}</h2>
                <h3 className="mb-8 text-3xl font-semibold text-white">{p.agendaTitle}</h3>
                <div className="space-y-6">
                  {p.agenda.map((item, i) => (
                    <div key={i} className="flex items-start gap-6 rounded-2xl border border-white/5 bg-white/5 p-5">
                      <div className={`flex flex-col items-center rounded-xl bg-white/5 px-4 py-2 ${accent.icon}`}>
                        <CalendarDays className="h-5 w-5" />
                        <span className="mt-1 text-xs font-semibold">{item.time}</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white">{item.title}</h4>
                        <p className="mt-2 text-sm text-slate-300">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Info Cards */}
          <section className="fade-up px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <div className="glass-card flex items-start gap-4 rounded-[28px] border border-white/10 p-6 shadow-glass">
                  <Globe2 className={`h-8 w-8 flex-shrink-0 ${accent.icon}`} />
                  <div>
                    <h4 className="font-semibold text-white">{p.formatTitle}</h4>
                    <p className="mt-2 text-sm text-slate-300">{p.formatDesc}</p>
                  </div>
                </div>
                <div className="glass-card flex items-start gap-4 rounded-[28px] border border-white/10 p-6 shadow-glass">
                  <Users className={`h-8 w-8 flex-shrink-0 ${accent.icon}`} />
                  <div>
                    <h4 className="font-semibold text-white">{p.audienceTitle}</h4>
                    <p className="mt-2 text-sm text-slate-300">{p.audienceDesc}</p>
                  </div>
                </div>
                <div className="glass-card flex items-start gap-4 rounded-[28px] border border-white/10 p-6 shadow-glass">
                  <Mic2 className={`h-8 w-8 flex-shrink-0 ${accent.icon}`} />
                  <div>
                    <h4 className="font-semibold text-white">{p.langTitle}</h4>
                    <p className="mt-2 text-sm text-slate-300">{p.langDesc}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </PageLayout>
  )
}
