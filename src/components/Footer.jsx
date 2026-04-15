import { useTranslation } from '../i18n'

export default function Footer({ theme }) {
  const t = useTranslation()

  return (
    <footer
      className={`border-t px-4 py-8 text-sm sm:px-6 transition-colors duration-500 ${
        theme === 'dark'
          ? 'border-white/10 bg-iite-dark/95 text-slate-400'
          : 'border-slate-200/70 bg-white/95 text-slate-700'
      }`}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p>{t.footer.copy1}</p>
        <p>{t.footer.copy2}</p>
      </div>
    </footer>
  )
}
