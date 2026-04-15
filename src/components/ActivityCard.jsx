export default function ActivityCard({ title, description, accent }) {
  const accentClass = accent === 'emerald' ? 'text-iite-green' : 'text-iite-cyan'
  return (
    <article className="glass-card rounded-[28px] border border-white/10 p-6 shadow-glass transition duration-500 hover:-translate-y-1 hover:border-iite-cyan/40">
      <div className="flex items-center justify-between gap-4">
        <div className={"h-12 w-12 rounded-3xl bg-white/5 p-3 text-white " + accentClass}>
          <span className="block h-full w-full rounded-2xl bg-gradient-to-br from-white/10 to-white/5" />
        </div>
        <span className={"rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-300 " + (accent === 'emerald' ? 'bg-emerald-500/10' : 'bg-cyan-500/10')}>
          {title.split(' ')[0]}
        </span>
      </div>
      <h3 className="mt-6 text-xl font-semibold text-white">{title}</h3>
      <p className="mt-4 text-slate-300 leading-7">{description}</p>
    </article>
  )
}
