import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef } from 'react'

export default function HeroSlider({ slides, label, heading }) {
  const sliderRef = useRef(null)

  const scroll = direction => {
    if (!sliderRef.current) return
    sliderRef.current.scrollBy({ left: direction * 320, behavior: 'smooth' })
  }

  return (
    <div className="mt-10 rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-glass backdrop-blur-xl sm:p-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-iite-purple">{label}</p>
          <h3 className="mt-2 text-xl font-semibold text-white">{heading}</h3>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => scroll(-1)} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10">
            <ChevronLeft size={18} />
          </button>
          <button onClick={() => scroll(1)} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div ref={sliderRef} className="flex gap-5 overflow-x-auto pb-3 scroll-smooth snap-x snap-mandatory">
        {slides.map(item => (
          <div key={item.title} className="snap-center min-w-[18rem] flex-shrink-0 rounded-3xl border border-white/10 bg-gradient-to-br from-iite-purple/70 via-[#8a6cff]/50 to-[#bea6ff]/20 p-6 shadow-glass transition hover:-translate-y-1">
            <p className="text-sm uppercase tracking-[0.24em] text-iite-green">{item.title}</p>
            <p className="mt-4 text-lg font-semibold text-white">{item.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
