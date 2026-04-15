import { MapPin, Phone, Globe2 } from 'lucide-react'
import { useTranslation } from '../i18n'

export default function ContactSection() {
  const t = useTranslation()

  return (
    <section id="contact" className="fade-up px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.26em] text-iite-cyan">{t.contact.tag}</p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">{t.contact.heading}</h2>
          <p className="mt-4 text-slate-300 sm:text-lg">
            {t.contact.description}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="glass-card rounded-[32px] border border-white/10 p-6 shadow-glass">
            <div className="flex items-center gap-3 text-iite-cyan">
              <MapPin className="h-5 w-5" />
              <h3 className="text-lg font-semibold text-white">{t.contact.address}</h3>
            </div>
            <p className="mt-4 text-slate-300 leading-7">Jl. K.H. Samanhudi No.31, Surakarta</p>
          </div>

          <div className="glass-card rounded-[32px] border border-white/10 p-6 shadow-glass">
            <div className="flex items-center gap-3 text-iite-cyan">
              <Phone className="h-5 w-5" />
              <h3 className="text-lg font-semibold text-white">{t.contact.phone}</h3>
            </div>
            <p className="mt-4 text-slate-300 leading-7">(0271) 743479</p>
          </div>

          <div className="glass-card rounded-[32px] border border-white/10 p-6 shadow-glass">
            <div className="flex items-center gap-3 text-iite-cyan">
              <Globe2 className="h-5 w-5" />
              <h3 className="text-lg font-semibold text-white">{t.contact.socialTitle}</h3>
            </div>
            <div className="mt-4 space-y-3 text-slate-300">
              <a href="#" className="block hover:text-white">{t.contact.instagram}</a>
              <a href="#" className="block hover:text-white">{t.contact.linkedin}</a>
              <a href="#" className="block hover:text-white">{t.contact.zoom}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
