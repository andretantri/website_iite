import { useState } from 'react'
import { ArrowRight, CalendarDays, Globe2, Sparkles, Trophy, BookOpen, Mic2, Leaf, Store, Newspaper, X, CreditCard, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from '../i18n'

const activities = [
  { key: 'competition', to: '/innovation_competition', icon: Trophy, color: 'text-iite-cyan' },
  { key: 'proceeding', to: '/proceeding', icon: BookOpen, color: 'text-rose-400' },
  { key: 'seminar', to: '/international_seminar', icon: Mic2, color: 'text-iite-purple' },
  { key: 'greenyouth', to: '/greenyouth', icon: Leaf, color: 'text-iite-green' },
  { key: 'msme', to: '/msme', icon: Store, color: 'text-amber-400' },
]

const getWhatsAppUrl = (phone) => {
  let cleaned = phone.replace(/\D/g, '')
  if (cleaned.startsWith('0')) cleaned = '62' + cleaned.slice(1)
  return `https://wa.me/${cleaned}`
}

export default function HeroSection() {
  const t = useTranslation()
  const [posterOpen, setPosterOpen] = useState(false)
  const speakers = t.pages.seminar.speakers

  return (
    <section id="hero" className="fade-up relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-8 rounded-[32px] border border-white/10 bg-iite-dark/80 p-8 shadow-glass backdrop-blur-xl sm:p-12">
          {/* Badge + Title + Description */}
          <div className="flex flex-col gap-6 text-center sm:text-left">
            <span className="inline-flex items-center justify-center rounded-full border border-iite-purple/30 bg-iite-purple/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.26em] text-iite-cyan sm:self-start">
              {t.hero.badge}
            </span>
            <div>
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
                IITE 2026
              </h1>
              <p className="mt-4 text-base text-slate-300 sm:text-lg">
                {t.hero.description}
              </p>
            </div>
          </div>

          {/* Poster + Conference Speakers */}
          <div className="grid gap-8 lg:grid-cols-5 items-stretch">
            {/* Poster - 3 columns */}
            <div className="lg:col-span-3 flex justify-center">
              <div className="relative cursor-pointer group" onClick={() => setPosterOpen(true)}>
                <div className="absolute -inset-4 rounded-[36px] bg-gradient-to-br from-iite-cyan/20 via-iite-purple/20 to-iite-green/10 blur-2xl transition-opacity group-hover:opacity-80" />
                <img
                  src={t.hero.posterImage || "/images/conference-poster.png"}
                  alt="IITE 2026 International Conference Poster"
                  className="relative rounded-[28px] border border-white/10 shadow-glass w-auto object-contain transition duration-300 group-hover:scale-[1.02] group-hover:border-iite-cyan/30"
                />
                <div className="absolute inset-0 flex items-center justify-center rounded-[28px] bg-black/0 transition duration-300 group-hover:bg-black/20">
                  <span className="rounded-full bg-white/0 px-4 py-2 text-sm font-semibold text-white opacity-0 transition duration-300 group-hover:bg-white/20 group-hover:opacity-100">
                    {t.hero.clickToEnlarge}
                  </span>
                </div>
              </div>
            </div>

            {/* Conference Speakers + Registration Fee - 2 columns */}
            <div className="lg:col-span-2 flex flex-col gap-4 h-full overflow-hidden">
              {/* Speakers Header */}
              <div className="rounded-3xl border border-iite-purple/20 bg-gradient-to-br from-iite-purple/10 to-transparent p-5">
                <p className="mb-1 text-sm uppercase tracking-[0.2em] text-iite-purple">{t.hero.speakersTag}</p>
                <p className="text-base font-semibold text-white">{t.hero.speakersTitle}</p>
              </div>

              {/* Speaker Cards */}
              {speakers.map((speaker, i) => (
                <div key={i} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 transition hover:border-iite-purple/30 hover:bg-white/[0.08]">
                  <img
                    src={speaker.image}
                    alt={speaker.country}
                    className="h-10 w-10 flex-shrink-0 rounded-full object-cover border-2 border-white/20"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{speaker.name}</p>
                    <p className="text-xs text-slate-400 truncate">{speaker.role}</p>
                  </div>
                </div>
              ))}

              {/* Registration Fee + Payment + Contact — fills remaining space */}
              <div className="flex-1 rounded-3xl border border-iite-cyan/20 bg-gradient-to-br from-iite-cyan/10 to-transparent p-5 flex flex-col gap-4">
                {/* Fee */}
                <div>
                  <p className="mb-1 text-sm uppercase tracking-[0.2em] text-iite-cyan">{t.hero.registrationFeeTag}</p>
                  <p className="text-base font-semibold text-white mb-3">{t.hero.registrationFeeTitle}</p>
                  {t.hero.registrationFees.map((fee, i) => (
                    <div key={i} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-3">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-iite-cyan" />
                        <span className="text-sm text-slate-200">{fee.label}</span>
                      </div>
                      <span className="font-bold text-white">{fee.price}</span>
                    </div>
                  ))}
                </div>

                {/* Payment Info */}
                <div>
                  <p className="mb-2 text-sm font-semibold text-white">{t.hero.paymentTitle}</p>
                  <div className="space-y-2 text-sm text-slate-300">
                    {t.hero.payments.map((pay, i) => (
                      <div key={i} className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2">
                        <p><span className="text-slate-400">{pay.bank}:</span> <span className="text-white font-medium">{pay.acc}</span></p>
                        <p className="text-xs text-slate-400">{pay.name}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Person */}
                <div>
                  <p className="mb-2 text-sm font-semibold text-white">{t.hero.contactPerson}</p>
                  {t.hero.contacts.map((contact, i) => (
                    <a
                      key={i}
                      href={getWhatsAppUrl(contact.phone)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 transition hover:border-iite-green/40 hover:bg-iite-green/10"
                    >
                      <Phone className="h-4 w-4 text-iite-green" />
                      <div>
                        <p className="text-sm font-semibold text-white">{contact.name}</p>
                        <p className="text-xs text-iite-green">{contact.phone}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Time / Location / Organizer — horizontal */}
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

      {/* Poster Modal */}
      {posterOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 cursor-pointer"
          onClick={() => setPosterOpen(false)}
        >
          <button
            className="absolute top-6 right-6 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            onClick={() => setPosterOpen(false)}
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={t.hero.posterImage || "/images/conference-poster.png"}
            alt="IITE 2026 Conference Poster"
            className="max-h-[90vh] max-w-[90vw] rounded-[20px] border border-white/10 object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}
