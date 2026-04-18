import { useEffect, useState } from 'react'

export default function ShootingStarsBackground() {
  const [stars, setStars] = useState([])

  useEffect(() => {
    // Generate an array of stars with random properties for variety
    const starCount = 30
    const newStars = Array.from({ length: starCount }).map((_, i) => ({
      id: i,
      // Random starting positions (top and right edges)
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      // Random animation durations between 2s and 6s
      animationDuration: `${2 + Math.random() * 4}s`,
      // Random animation delay to make them fall at different times
      animationDelay: `${Math.random() * 5}s`,
      // Random size for the star head
      size: `${1 + Math.random() * 2}px`,
      // Random opacity for depth
      opacity: 0.4 + Math.random() * 0.6,
    }))
    setStars(newStars)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d051a] via-[#1a0b2e] to-[#0d051a]" />
      
      {stars.map((star) => (
        <div
          key={star.id}
          className="shooting-star"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            animationDuration: star.animationDuration,
            animationDelay: star.animationDelay,
            opacity: star.opacity,
          }}
        />
      ))}
    </div>
  )
}
