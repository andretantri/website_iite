import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { LanguageProvider } from './i18n'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import Footer from './components/Footer'
import InnovationCompetitionPage from './pages/InnovationCompetitionPage'
import ProceedingPage from './pages/ProceedingPage'
import InternationalSeminarPage from './pages/InternationalSeminarPage'
import GreenYouthPage from './pages/GreenYouthPage'
import MSMEPage from './pages/MSMEPage'

function HomePage() {
  return (
    <main className="relative overflow-hidden">
      <HeroSection />
    </main>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function App() {
  const location = useLocation()
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark'
    return localStorage.getItem('theme') || 'dark'
  })
  const [language, setLanguage] = useState(() => {
    if (typeof window === 'undefined') return 'en'
    return localStorage.getItem('language') || 'en'
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.documentElement.classList.toggle('light', theme === 'light')
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    let observer
    const timer = setTimeout(() => {
      observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible')
            }
          })
        },
        { threshold: 0.14 },
      )
      document.querySelectorAll('.fade-up').forEach(element => observer.observe(element))
    }, 50)
    return () => {
      clearTimeout(timer)
      if (observer) observer.disconnect()
    }
  }, [theme, location.pathname])

  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  return (
    <LanguageProvider language={language} toggleLanguage={() => setLanguage(prev => (prev === 'id' ? 'en' : 'id'))}>
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-iite-dark text-white' : 'bg-white text-slate-900'} transition-colors duration-500`}>
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" aria-hidden="true" />
        <Navbar theme={theme} setTheme={setTheme} />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/innovation_competition" element={<InnovationCompetitionPage theme={theme} />} />
          <Route path="/proceeding" element={<ProceedingPage theme={theme} />} />
          <Route path="/international_seminar" element={<InternationalSeminarPage theme={theme} />} />
          <Route path="/greenyouth" element={<GreenYouthPage theme={theme} />} />
          <Route path="/msme" element={<MSMEPage theme={theme} />} />
        </Routes>
        <Footer theme={theme} />
      </div>
    </LanguageProvider>
  )
}

export default App
