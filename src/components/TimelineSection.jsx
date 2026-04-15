import { useTranslation } from '../i18n'

export default function TimelineSection() {
  const t = useTranslation()
  const milestones = t.timeline.milestones

  return (
    <section id="timeline" className="fade-up px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.26em] text-iite-cyan">{t.timeline.tag}</p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">{t.timeline.heading}</h2>
          <p className="mt-4 text-slate-300 sm:text-lg">
            {t.timeline.description}
          </p>
        </div>

        <div className="space-y-6">
          {milestones.map((milestone, index) => (
            <div key={milestone.label} className="glass-card rounded-[32px] border border-white/10 p-6 shadow-glass sm:flex sm:items-start sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-iite-cyan/10 text-iite-cyan ring-1 ring-iite-cyan/20">
                  <span className="text-lg font-semibold">{index + 1}</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{milestone.label}</h3>
                  <p className="mt-1 text-sm uppercase tracking-[0.18em] text-slate-400">{milestone.date}</p>
                </div>
              </div>
              <p className="mt-4 leading-7 text-slate-300 sm:mt-0 sm:max-w-2xl">{milestone.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
