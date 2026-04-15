import { useEffect, useState } from 'react'
import { LanguageProvider } from './i18n'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import ActivitiesSection from './components/ActivitiesSection'
import TimelineSection from './components/TimelineSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'

function App() {
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

    const observer = new IntersectionObserver(
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
    return () => observer.disconnect()
  }, [theme])

  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  return (
    <LanguageProvider language={language} toggleLanguage={() => setLanguage(prev => (prev === 'id' ? 'en' : 'id'))}>
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-iite-dark text-white' : 'bg-white text-slate-900'} transition-colors duration-500`}>
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" aria-hidden="true" />
        <Navbar theme={theme} setTheme={setTheme} />
        <main className="relative overflow-hidden">
          <HeroSection />
          <AboutSection />
          <ActivitiesSection />
          <TimelineSection />
          <ContactSection />
        </main>
        <Footer theme={theme} />
      </div>
    </LanguageProvider>
  )
}

export default App
