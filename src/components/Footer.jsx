import { useTranslation } from '../i18n'
import { Link } from 'react-router-dom'

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
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center text-center gap-2">
        <p>{t?.footer?.copy1 || '© 2026 IITE 2026.'}</p>
        {t?.footer?.copy2 && <p>{t.footer.copy2}</p>}
      </div>
    </footer>
  )
}
