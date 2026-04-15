import { useTranslation } from '../i18n'
import ActivityCard from './ActivityCard'

export default function ActivitiesSection() {
  const t = useTranslation()
  const activities = t.activities.cards

  return (
    <section id="activities" className="fade-up px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.26em] text-iite-cyan">{t.activities.tag}</p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">{t.activities.heading}</h2>
          <p className="mt-4 text-slate-300 sm:text-lg">
            {t.activities.description}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {activities.map(activity => (
            <ActivityCard key={activity.title} {...activity} />
          ))}
        </div>
      </div>
    </section>
  )
}
