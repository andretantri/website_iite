import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import NET from 'vanta/dist/vanta.net.min'

export default function VantaNetBackground({
  children,
  theme = 'dark',
  className = '',
  color,
  backgroundColor,
  ...options
}) {
  const [vantaEffect, setVantaEffect] = useState(null)
  const myRef = useRef(null)

  useEffect(() => {
    let effect = null

    // Determine colors based on theme if not explicitly overridden
    let finalBgColor = 0x15293c // default from Vanta JS URL (hex for 1386812)
    let finalColor = 0xdd3fff   // default from Vanta JS URL (hex for 14499839)

    if (theme === 'light') {
      finalBgColor = 0xf1f5f9 // slate-100
      finalColor = 0x7c67c3   // iite-purple
    } else {
      // Dark mode can use the dark blue background from the Vanta JS URL,
      // or we can use the main dark theme background of the site: #3b0e3d (0x3b0e3d)
      finalBgColor = backgroundColor !== undefined ? backgroundColor : 0x15293c
      finalColor = color !== undefined ? color : 0xdd3fff
    }

    if (myRef.current) {
      try {
        effect = NET({
          el: myRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: finalColor,
          backgroundColor: finalBgColor,
          backgroundAlpha: 1.0,
          points: 8.0,
          maxDistance: 20.0,
          spacing: 11.0,
          showDots: true,
          ...options,
        })
        setVantaEffect(effect)
      } catch (err) {
        console.error('Failed to initialize Vanta.js NET effect:', err)
      }
    }

    return () => {
      if (effect) {
        effect.destroy()
      }
    }
  }, [theme, color, backgroundColor, JSON.stringify(options)])

  return (
    <div ref={myRef} className={`relative overflow-hidden ${className}`}>
      {/* Vanta creates the canvas as an absolute positioned element inside.
          We need to ensure our children are positioned above it and have a relative z-index. */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  )
}
