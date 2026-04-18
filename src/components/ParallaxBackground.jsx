import { useEffect, useRef } from 'react'

export default function ParallaxBackground() {
  const containerRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      const scrollY = window.scrollY
      const layers = containerRef.current.querySelectorAll('[data-speed]')
      layers.forEach(layer => {
        const speed = parseFloat(layer.dataset.speed)
        layer.style.transform = `translateY(${scrollY * speed}px)`
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div ref={containerRef} className="parallax-bg" aria-hidden="true">
      {/* Layer 1: Deep tech grid (slowest) */}
      <div className="parallax-layer parallax-grid" data-speed="-0.15" />

      {/* Layer 2: Circuit lines */}
      <div className="parallax-layer parallax-circuits" data-speed="-0.25">
        <svg className="parallax-circuit-svg" viewBox="0 0 1200 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Horizontal circuit paths */}
          <path d="M0 200 H300 L330 230 H500" stroke="rgba(0,210,255,0.08)" strokeWidth="1" />
          <path d="M700 200 H900 L930 170 H1200" stroke="rgba(124,103,195,0.08)" strokeWidth="1" />
          <path d="M0 500 H200 L230 470 H450 L480 500 H650" stroke="rgba(16,185,129,0.06)" strokeWidth="1" />
          <path d="M800 500 H950 L980 530 H1200" stroke="rgba(0,210,255,0.06)" strokeWidth="1" />
          <path d="M0 350 H150 L180 380 H400" stroke="rgba(124,103,195,0.05)" strokeWidth="1" />
          <path d="M600 650 H800 L830 620 H1000 L1030 650 H1200" stroke="rgba(0,210,255,0.07)" strokeWidth="1" />
          {/* Circuit nodes */}
          <circle cx="300" cy="200" r="4" fill="rgba(0,210,255,0.15)" />
          <circle cx="500" cy="230" r="3" fill="rgba(0,210,255,0.12)" />
          <circle cx="900" cy="200" r="4" fill="rgba(124,103,195,0.15)" />
          <circle cx="200" cy="500" r="3" fill="rgba(16,185,129,0.12)" />
          <circle cx="450" cy="470" r="4" fill="rgba(16,185,129,0.15)" />
          <circle cx="650" cy="500" r="3" fill="rgba(0,210,255,0.12)" />
          <circle cx="150" cy="350" r="3" fill="rgba(124,103,195,0.1)" />
          <circle cx="800" cy="650" r="4" fill="rgba(0,210,255,0.12)" />
          <circle cx="1000" cy="620" r="3" fill="rgba(0,210,255,0.1)" />
          {/* Pulsing nodes */}
          <circle cx="300" cy="200" r="8" fill="none" stroke="rgba(0,210,255,0.1)" strokeWidth="1" className="parallax-pulse" />
          <circle cx="450" cy="470" r="8" fill="none" stroke="rgba(16,185,129,0.1)" strokeWidth="1" className="parallax-pulse" style={{ animationDelay: '2s' }} />
          <circle cx="900" cy="200" r="8" fill="none" stroke="rgba(124,103,195,0.1)" strokeWidth="1" className="parallax-pulse" style={{ animationDelay: '4s' }} />
        </svg>
      </div>

      {/* Layer 3: Floating hexagons */}
      <div className="parallax-layer parallax-hexagons" data-speed="-0.4">
        <div className="parallax-hex parallax-hex--1" />
        <div className="parallax-hex parallax-hex--2" />
        <div className="parallax-hex parallax-hex--3" />
        <div className="parallax-hex parallax-hex--4" />
      </div>

      {/* Layer 4: Glowing orbs (fastest parallax) */}
      <div className="parallax-layer parallax-orbs" data-speed="-0.5">
        <div className="parallax-orb parallax-orb--cyan" />
        <div className="parallax-orb parallax-orb--purple" />
        <div className="parallax-orb parallax-orb--green" />
      </div>

      {/* Layer 5: Data streams */}
      <div className="parallax-layer parallax-streams" data-speed="-0.2">
        <div className="parallax-stream parallax-stream--1" />
        <div className="parallax-stream parallax-stream--2" />
        <div className="parallax-stream parallax-stream--3" />
      </div>
    </div>
  )
}
