import { createContext, createElement, useContext, useState, useEffect } from 'react'
import defaultTranslations from './translations-data.json'

export { defaultTranslations }

function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item)
}

function mergeDeep(target, source) {
  let output = Object.assign({}, target)
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] })
        } else {
          output[key] = mergeDeep(target[key], source[key])
        }
      } else {
        Object.assign(output, { [key]: source[key] })
      }
    })
  }
  return output
}

function migrateOldKeys(data) {
  if (!data) return data
  const languages = ['id', 'en']
  const pages = ['competition', 'proceeding']
  
  languages.forEach(lang => {
    if (data[lang] && data[lang].pages) {
      pages.forEach(page => {
        const pageData = data[lang].pages[page]
        if (pageData && pageData.youtubeUrl && !pageData.youtubeUrl1) {
          pageData.youtubeUrl1 = pageData.youtubeUrl
          if (!pageData.youtubeTitle1) {
            pageData.youtubeTitle1 = page === 'competition'
              ? (lang === 'id' ? 'Video Presentation Kompetisi Inovasi 1' : 'Innovation Competition Presentation Video 1')
              : (lang === 'id' ? 'Video Poster & Proceeding Expo 1' : 'Poster & Proceeding Expo Video 1')
          }
        }
      })
    }
  })
  return data
}

const LanguageContext = createContext({
  language: 'en',
  toggleLanguage: () => { },
  translations: {},
  updateTranslations: () => { },
  resetTranslations: () => { },
})

export function LanguageProvider({ language = 'en', toggleLanguage, children }) {
  const [currentTranslations, setCurrentTranslations] = useState(() => {
    try {
      const stored = localStorage.getItem('iite_translations')
      if (stored) {
        const parsed = JSON.parse(stored)
        // Check version compatibility to invalidate old browser cache
        if (parsed && parsed.version && parsed.version === defaultTranslations.version) {
          const migrated = migrateOldKeys(parsed)
          return mergeDeep(defaultTranslations, migrated)
        } else {
          localStorage.removeItem('iite_translations')
        }
      }
    } catch (e) {
      console.error('Error loading translations from local storage:', e)
    }
    return defaultTranslations
  })

  useEffect(() => {
    const fetchTranslations = async () => {
      try {
        const endpoint = import.meta.env.DEV ? '/api/get-translations' : '/api/get-translations.php'
        let res = await fetch(endpoint)
        
        // Fallback if PHP endpoint returns 404 on static web hosting
        if (!res.ok && !import.meta.env.DEV) {
          res = await fetch('/api/translations-data.json?v=' + (defaultTranslations.version || Date.now()))
        }

        if (res.ok) {
          const data = await res.json()
          if (data && (data.en || data.id)) {
            const migrated = migrateOldKeys(data)
            const merged = mergeDeep(defaultTranslations, migrated)
            setCurrentTranslations(merged)
          }
        }
      } catch (err) {
        try {
          const staticRes = await fetch('/api/translations-data.json?v=' + (defaultTranslations.version || Date.now()))
          if (staticRes.ok) {
            const data = await staticRes.json()
            if (data && (data.en || data.id)) {
              const migrated = migrateOldKeys(data)
              const merged = mergeDeep(defaultTranslations, migrated)
              setCurrentTranslations(merged)
            }
          }
        } catch (e) {
          console.error('Failed to load translations from server database:', e)
        }
      }
    }
    fetchTranslations()
  }, [])

  const updateTranslations = (newTranslations) => {
    setCurrentTranslations(newTranslations)
    localStorage.setItem('iite_translations', JSON.stringify(newTranslations))
  }

  const resetTranslations = () => {
    setCurrentTranslations(defaultTranslations)
    localStorage.removeItem('iite_translations')
  }

  return createElement(
    LanguageContext.Provider,
    {
      value: {
        language: 'en',
        toggleLanguage: () => {},
        translations: currentTranslations,
        updateTranslations,
        resetTranslations,
      },
    },
    children
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}

export function useTranslation() {
  const { translations } = useContext(LanguageContext)
  const activeTranslations = translations || defaultTranslations
  return activeTranslations.en || activeTranslations.id || defaultTranslations.en
}
