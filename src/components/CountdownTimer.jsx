import { useEffect, useState } from 'react'
import { Clock3 } from 'lucide-react'

const targetDate = new Date('2026-07-22T08:00:00')

function getCountdown() {
  const now = new Date()
  const delta = Math.max(0, targetDate - now)
  const seconds = Math.floor((delta / 1000) % 60)
  const minutes = Math.floor((delta / 1000 / 60) % 60)
  const hours = Math.floor((delta / 1000 / 60 / 60) % 24)
  const days = Math.floor(delta / 1000 / 60 / 60 / 24)
  return { days, hours, minutes, seconds }
}

export default function CountdownTimer() {
  const [countdown, setCountdown] = useState(getCountdown())

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdown())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-glass backdrop-blur-xl sm:p-6">
      <div className="flex items-center gap-3 text-iite-purple">
        <Clock3 className="h-5 w-5" />
        <p className="text-sm uppercase tracking-[0.24em] text-slate-300">Countdown menuju IITE 2026</p>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-4">
        {[
          { label: 'Hari', value: countdown.days },
          { label: 'Jam', value: countdown.hours },
          { label: 'Menit', value: countdown.minutes },
          { label: 'Detik', value: countdown.seconds },
        ].map(item => (
          <div key={item.label} className="rounded-3xl bg-slate-950/50 px-4 py-4 text-center ring-1 ring-white/10">
            <p className="text-3xl font-semibold text-white">{String(item.value).padStart(2, '0')}</p>
            <p className="mt-2 text-sm uppercase tracking-[0.24em] text-slate-400">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
