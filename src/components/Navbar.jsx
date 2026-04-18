import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Moon, Sun } from 'lucide-react'
import { useLanguage, useTranslation } from '../i18n'

const pageLinks = [
  { key: 'competition', to: '/innovation_competition' },
  { key: 'proceeding', to: '/proceeding' },
  { key: 'seminar', to: '/international_seminar' },
  { key: 'greenyouth', to: '/greenyouth' },
  { key: 'msme', to: '/msme' },
]

export default function Navbar({ theme, setTheme }) {
  const [open, setOpen] = useState(false)
  const { toggleLanguage, language } = useLanguage()
  const t = useTranslation()
  const location = useLocation()
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  return (
    <header
      className={`sticky top-0 z-30 border-b backdrop-blur-xl transition-colors duration-500 ${
        theme === 'dark'
          ? 'border-white/10 bg-iite-dark/90 text-white'
          : 'border-slate-200/70 bg-white/95 text-slate-900'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <Link to="/" className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em]">
          <span
            className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl ${
              theme === 'dark' ? 'bg-white/10 text-iite-cyan' : 'bg-slate-100 text-iite-cyan'
            }`}
          >
            I
          </span>
          IITE 2026
        </Link>

        <nav className="hidden items-center gap-4 md:flex">
          {pageLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`transition text-sm ${
                location.pathname === link.to
                  ? 'text-iite-cyan font-semibold'
                  : theme === 'dark' ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.nav[link.key]}
            </Link>
          ))}

          <button
            onClick={toggleTheme}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border px-0 transition ${
              theme === 'dark'
                ? 'border-white/10 bg-white/5 text-white hover:bg-white/10'
                : 'border-slate-300/70 bg-slate-100 text-slate-900 hover:bg-slate-200'
            }`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            onClick={toggleLanguage}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-iite-cyan/50 bg-iite-cyan/10 text-iite-cyan transition hover:border-iite-cyan hover:bg-iite-cyan/20"
            aria-label="Toggle language"
          >
            {t.nav.languageLabel}
          </button>

          <Link
            to="/#contact"
            className="rounded-full border border-iite-cyan/50 bg-iite-cyan/10 px-4 py-2 text-sm font-medium text-iite-cyan transition hover:border-iite-cyan hover:bg-iite-cyan/20"
          >
            {t.nav.contactBtn}
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border px-0 transition ${
              theme === 'dark'
                ? 'border-white/10 bg-white/5 text-white hover:bg-white/10'
                : 'border-slate-300/70 bg-slate-100 text-slate-900 hover:bg-slate-200'
            }`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={toggleLanguage}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-iite-cyan/50 bg-iite-cyan/10 text-iite-cyan transition hover:border-iite-cyan hover:bg-iite-cyan/20"
            aria-label="Toggle language"
          >
            {t.nav.languageLabel}
          </button>
          <button
            className={`inline-flex items-center rounded-lg border px-3 py-3 transition ${
              theme === 'dark'
                ? 'border-white/10 bg-white/5 text-white hover:bg-white/10'
                : 'border-slate-300/70 bg-slate-100 text-slate-900 hover:bg-slate-200'
            }`}
            onClick={() => setOpen(!open)}
            aria-label="Toggle navigation"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div
          className={`border-t px-4 py-4 md:hidden ${
            theme === 'dark' ? 'border-white/10 bg-iite-dark/95' : 'border-slate-200/70 bg-white/95'
          }`}
        >
          <div className="flex flex-col gap-3">
            {pageLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-3 py-2 text-sm transition ${
                  location.pathname === link.to
                    ? 'text-iite-cyan font-semibold'
                    : theme === 'dark'
                      ? 'text-slate-300 hover:bg-white/5 hover:text-white'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {t.nav[link.key]}
              </Link>
            ))}
            <Link
              to="/#contact"
              onClick={() => setOpen(false)}
              className="rounded-full border border-iite-cyan/50 bg-iite-cyan/10 px-4 py-2 text-sm font-medium text-iite-cyan transition hover:border-iite-cyan hover:bg-iite-cyan/20"
            >
              {t.nav.contactBtn}
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
