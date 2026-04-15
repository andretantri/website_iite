import { useTranslation } from '../i18n'

export default function AboutSection() {
  const t = useTranslation()

  return (
    <section id="about" className="fade-up px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-3xl text-center">
          <p className="text-sm uppercase tracking-[0.26em] text-iite-cyan">{t.about.tag}</p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">{t.about.heading}</h2>
          <p className="mt-5 text-base leading-8 text-slate-300 sm:text-lg">
            {t.about.description}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="glass-card rounded-[32px] border border-white/10 p-8 shadow-glass">
            <h3 className="text-xl font-semibold text-white">{t.about.programTitle}</h3>
            <p className="mt-4 text-slate-300 leading-7">
              {t.about.programText}
            </p>
          </div>
          <div className="glass-card rounded-[32px] border border-white/10 p-8 shadow-glass">
            <h3 className="text-xl font-semibold text-white">{t.about.benefitTitle}</h3>
            <p className="mt-4 text-slate-300 leading-7">
              {t.about.benefitText}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
