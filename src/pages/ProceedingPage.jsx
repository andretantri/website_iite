import { useState, useRef } from 'react'
import { BookOpen, Lightbulb, Users, CheckCircle2, ArrowRight, CreditCard, Phone, Building2, X, Search, ChevronLeft, ChevronRight, ArrowLeft, Video } from 'lucide-react'
import { useTranslation, useLanguage } from '../i18n'
import PageLayout from '../components/PageLayout'
import YouTubeEmbed, { getYouTubeEmbedUrl } from '../components/YouTubeEmbed'

export default function ProceedingPage({ theme }) {
  const t = useTranslation()
  const { language, translations } = useLanguage()
  const p = t?.pages?.proceeding || {}

  // Safe poster fallback across languages so added posters always show up
  const idPosters = translations?.id?.pages?.proceeding?.posters || []
  const enPosters = translations?.en?.pages?.proceeding?.posters || []
  const posters = (p.posters && p.posters.length > 0)
    ? p.posters
    : (idPosters.length > 0 ? idPosters : enPosters)

  const [posterOpen, setPosterOpen] = useState(false)
  const [selectedPoster, setSelectedPoster] = useState(null)
  const scrollRef = useRef(null)

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current
      const offset = direction === 'left' ? -clientWidth : clientWidth
      scrollRef.current.scrollTo({ left: scrollLeft + offset, behavior: 'smooth' })
    }
  }

  const getWhatsAppUrl = (phone) => {
    let cleaned = phone.replace(/\D/g, '')
    if (cleaned.startsWith('0')) cleaned = '62' + cleaned.slice(1)
    return `https://wa.me/${cleaned}`
  }

  return (
    <PageLayout theme={theme} accentColor="rose">
      {(accent) => (
        <>
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
                src={p.posterImage || "/images/proceeding-poster.png"}
                alt="IITE 2026 Proceeding Poster"
                className="max-h-[90vh] max-w-[90vw] rounded-[20px] border border-white/10 object-contain shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}

          {/* Poster Description Page Overlay */}
          {selectedPoster && (
            <div className="fixed inset-0 z-50 bg-iite-dark overflow-y-auto text-white">
              {/* Header */}
              <div className="sticky top-0 z-10 border-b border-white/10 bg-iite-dark/85 backdrop-blur-md px-4 py-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl flex items-center justify-between">
                  <button
                    onClick={() => setSelectedPoster(null)}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    {language === 'id' ? 'Kembali ke Poster Expo' : 'Back to Poster Expo'}
                  </button>
                  <span className="text-xs font-bold text-rose-400 uppercase tracking-widest">
                    {language === 'id' ? 'Detail Poster' : 'Poster Details'}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-2">
                  {/* Left Side: Large Poster Image */}
                  <div className="flex justify-center items-start">
                    <div className="relative group overflow-hidden rounded-[28px] border border-white/10 shadow-2xl bg-white/5 p-2">
                      <img
                        src={selectedPoster.image || "/images/proceeding-poster.png"}
                        alt={selectedPoster.title}
                        className="max-h-[75vh] w-auto object-contain rounded-[20px]"
                      />
                    </div>
                  </div>

                  {/* Right Side: Poster Info */}
                  <div className="rounded-[32px] border border-white/10 bg-white/[0.02] p-8 backdrop-blur-sm sm:p-12 space-y-6">
                    <div>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-400/30 bg-rose-400/10 px-3 py-1 text-xs font-semibold text-rose-400">
                        Poster Expo
                      </span>
                    </div>
                    <h1 className="text-3xl font-extrabold text-white leading-tight sm:text-4xl">
                      {selectedPoster.title}
                    </h1>
                    <div className="border-t border-b border-white/5 py-4 space-y-2">
                      <p className="text-sm text-slate-400 font-medium">
                        {language === 'id' ? 'Penulis / Presenter & Institusi:' : 'Authors / Presenter & Institution:'}
                      </p>
                      <p className="text-lg font-semibold text-rose-400">
                        {selectedPoster.author}
                      </p>
                    </div>
                    <div className="space-y-3">
                      <h2 className="text-lg font-bold text-white">
                        {language === 'id' ? 'Abstrak / Deskripsi:' : 'Abstract / Description:'}
                      </h2>
                      <p className="text-base text-slate-300 leading-relaxed whitespace-pre-wrap">
                        {selectedPoster.desc}
                      </p>
                    </div>

                    {getYouTubeEmbedUrl(selectedPoster.youtubeUrl) && (
                      <div className="pt-4 border-t border-white/10 space-y-3">
                        <h2 className="text-base font-bold text-white flex items-center gap-2">
                          <Video className="h-4 w-4 text-rose-400" />
                          {language === 'id' ? 'Video Presentasi Poster:' : 'Poster Presentation Video:'}
                        </h2>
                        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 shadow-lg bg-black">
                          <iframe
                            src={getYouTubeEmbedUrl(selectedPoster.youtubeUrl)}
                            title={selectedPoster.title}
                            className="absolute inset-0 h-full w-full border-0"
                            allowFullScreen
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Hero + Poster */}
          <section className="fade-up px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                {/* Poster */}
                <div className="order-2 lg:order-1 flex justify-center">
                  <div className="relative cursor-pointer group" onClick={() => setPosterOpen(true)}>
                    <div className={`absolute -inset-4 rounded-[36px] bg-gradient-to-br from-rose-500/20 via-rose-600/20 to-rose-400/10 blur-2xl transition-opacity group-hover:opacity-80`} />
                    <img
                      src={p.posterImage || "/images/proceeding-poster.png"}
                      alt="IITE 2026 Proceeding Poster"
                      className="relative rounded-[28px] border border-white/10 shadow-glass max-h-[600px] w-auto object-contain transition duration-300 group-hover:scale-[1.02] group-hover:border-rose-400/30"
                    />
                    <div className="absolute inset-0 flex items-center justify-center rounded-[28px] bg-black/0 transition duration-300 group-hover:bg-black/20">
                      <span className="rounded-full bg-white/0 px-4 py-2 text-sm font-semibold text-white opacity-0 transition duration-300 group-hover:bg-white/20 group-hover:opacity-100">
                        Klik untuk memperbesar
                      </span>
                    </div>
                  </div>
                </div>
                {/* Hero Content */}
                <div className="order-1 lg:order-2 rounded-[32px] border border-white/10 bg-iite-dark/80 p-8 shadow-glass backdrop-blur-xl sm:p-12">
                  <span className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] ${accent.badge}`}>
                    <BookOpen className="h-4 w-4" />
                    {p.badge}
                  </span>
                  <h1 className={`mt-6 bg-gradient-to-r bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl lg:text-5xl ${accent.heading}`}>
                    {p.title}
                  </h1>
                  <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                    {p.description}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-4">
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLSd3CDLTdYNk_0rOHjMLTy03JGS5WNa8i0no-mvyDkOkiWNS1A/viewform" target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition hover:-translate-y-0.5 ${accent.btn}`}>
                      {p.registerBtn}
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Video Section */}
          <YouTubeEmbed url={p.youtubeUrl} title="Video Poster & Proceeding Expo" subtitle="Official Video" accentColor="rose" />

          {/* Gallery Poster Section (5 posters per row on desktop) */}
          {posters.length > 0 && (
            <section className="fade-up px-4 py-8 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-7xl">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xs uppercase tracking-[0.26em] text-rose-400 font-bold">
                      Poster Gallery
                    </h2>
                    <h3 className="text-2xl font-bold text-white mt-0.5">
                      Research Poster Collection ({posters.length})
                    </h3>
                  </div>
                  {posters.length > 1 && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => scroll('left')}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
                        aria-label="Scroll Left"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => scroll('right')}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
                        aria-label="Scroll Right"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Poster Cards Scroll Area (5 Posters per row on desktop) */}
                <div
                  ref={scrollRef}
                  className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory pb-4"
                  style={{ scrollSnapType: 'x mandatory' }}
                >
                  {posters.map((poster, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedPoster(poster)}
                      className="w-[calc(80%-10px)] sm:w-[calc(50%-12px)] md:w-[calc(33.333%-12px)] lg:w-[calc(20%-13px)] shrink-0 snap-start cursor-pointer group"
                    >
                      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-3 transition duration-300 group-hover:-translate-y-1 group-hover:border-rose-400/40 group-hover:bg-white/[0.08] flex flex-col h-full">
                        {/* Poster Thumbnail */}
                        <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-slate-950/40">
                          <img
                            src={poster.image || "/images/proceeding-poster.png"}
                            alt={poster.title}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-iite-dark/85 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition" />
                        </div>
                        {/* Poster Info */}
                        <div className="mt-3 flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="font-bold text-white text-xs sm:text-sm line-clamp-2 group-hover:text-rose-400 transition leading-snug">
                              {poster.title}
                            </h4>
                            <p className="mt-1 text-[11px] font-semibold text-rose-400/90 truncate">
                              {poster.author}
                            </p>
                          </div>
                          <div className="mt-1.5 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                            {poster.desc}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Sub Themes — Soft warm rose */}
          <section className="fade-up relative overflow-hidden">
            <div className="absolute inset-0 card-section-bg" />
            <div className="relative px-4 py-20 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-7xl">
                <h2 className="mb-2 text-sm uppercase tracking-[0.26em] text-rose-400">{p.categoriesTag}</h2>
                <h3 className="mb-8 text-3xl font-semibold text-white">{p.categoriesTitle}</h3>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {p.categories.map((cat, i) => (
                    <div key={i} className={`group rounded-[24px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition duration-500 hover:-translate-y-1 hover:border-rose-400/30 hover:bg-white/[0.08]`}>
                      <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 ${accent.icon}`}>
                        {i === 0 ? <Lightbulb className="h-6 w-6" /> : i === 1 ? <Users className="h-6 w-6" /> : i === 2 ? <Search className="h-6 w-6" /> : <Building2 className="h-6 w-6" />}
                      </div>
                      <h4 className="text-lg font-semibold text-white">{cat.title}</h4>
                      <p className="mt-3 text-sm leading-7 text-slate-300">{cat.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Registration Fee */}
          <section className="fade-up px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <h2 className="mb-2 text-sm uppercase tracking-[0.26em] text-rose-400">{p.feeTag}</h2>
              <h3 className="mb-8 text-3xl font-semibold text-white">{p.feeTitle}</h3>
              <div className="grid gap-8 lg:grid-cols-2">
                <div className="space-y-4">
                  {p.fees.map((fee, i) => (
                    <div key={i} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.06] px-6 py-4 backdrop-blur-sm transition hover:border-rose-400/30">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-rose-400" />
                        <span className="text-slate-200">{fee.label}</span>
                      </div>
                      <span className="font-bold text-white">{fee.price}</span>
                    </div>
                  ))}
                </div>
                <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
                  <h4 className="mb-4 text-lg font-semibold text-white">{p.paymentTitle}</h4>
                  <div className="space-y-3 text-sm text-slate-300">
                    <p>{p.paymentDesc}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Requirements & Facilities */}
          <section className="fade-up relative overflow-hidden">
            <div className="absolute inset-0 card-section-bg" />
            <div className="relative px-4 py-20 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-7xl">
                <div className="rounded-[32px] border border-rose-400/10 bg-white/[0.02] p-8 backdrop-blur-sm sm:p-12">
                  <h2 className="mb-2 text-sm uppercase tracking-[0.26em] text-rose-400">{p.requirementsTag}</h2>
                  <h3 className="mb-8 text-3xl font-semibold text-white">{p.requirementsTitle}</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {p.requirements.map((req, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-rose-400" />
                        <p className="text-slate-300">{req}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Timeline */}
          <section className="fade-up px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <h2 className="mb-2 text-sm uppercase tracking-[0.26em] text-rose-400">{p.timelineTag}</h2>
              <h3 className="mb-10 text-3xl font-semibold text-white">{p.timelineTitle}</h3>
              <div className="relative border-l-2 border-rose-400/30 pl-8">
                {p.timeline.map((item, i) => (
                  <div key={i} className="relative mb-12 last:mb-0">
                    <div className="absolute -left-[41px] top-1 h-4 w-4 rounded-full border-2 border-iite-dark bg-gradient-to-br from-rose-400 to-rose-600 shadow-lg shadow-rose-400/20" />
                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 backdrop-blur-sm transition hover:border-rose-400/30 hover:bg-white/[0.07]">
                      <p className="text-sm font-bold text-rose-400">{item.date}</p>
                      <h4 className="mt-1 text-lg font-semibold text-white">{item.label}</h4>
                      <p className="mt-2 text-sm text-slate-300">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contacts */}
          <section className="fade-up relative overflow-hidden">
            <div className="absolute inset-0 card-section-bg" />
            <div className="relative px-4 py-20 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-7xl">
                <h2 className="mb-2 text-sm uppercase tracking-[0.26em] text-rose-400">{p.contactsTag}</h2>
                <h3 className="mb-8 text-3xl font-semibold text-white">{p.contactsTitle}</h3>
                <div className="grid gap-6 sm:grid-cols-2">
                  {p.contacts.map((contact, i) => (
                    <div key={i} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 backdrop-blur-sm">
                      <Phone className="h-5 w-5 text-rose-400" />
                      <div>
                        <p className="font-semibold text-white">{contact.name}</p>
                        <a href={getWhatsAppUrl(contact.phone)} target="_blank" rel="noopener noreferrer" className="text-sm text-rose-400 hover:text-rose-300 hover:underline">
                          {contact.phone}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </PageLayout>
  )
}
