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

const LanguageContext = createContext({
  language: 'id',
  toggleLanguage: () => {},
  translations: {},
  updateTranslations: () => {},
  resetTranslations: () => {},
})

export function LanguageProvider({ language, toggleLanguage, children }) {
  const [currentTranslations, setCurrentTranslations] = useState(() => {
    try {
      const stored = localStorage.getItem('iite_translations')
      if (stored) {
        return mergeDeep(defaultTranslations, JSON.parse(stored))
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
        const res = await fetch(endpoint)
        if (res.ok) {
          const data = await res.json()
          if (data && (data.id || data.en)) {
            setCurrentTranslations(data)
          }
        }
      } catch (err) {
        console.error('Failed to load translations from server database:', err)
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
        language,
        toggleLanguage,
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
  const { language, translations } = useContext(LanguageContext)
  const activeTranslations = translations || defaultTranslations
  return activeTranslations[language] || activeTranslations.id
}
