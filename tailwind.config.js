import forms from '@tailwindcss/forms'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'iite-dark': '#1a1a2e',
        'iite-purple': '#7c67c3',
        'iite-cyan': '#00d2ff',
        'iite-green': '#10b981',
        'polinus-red': '#cc0000',
      },
      boxShadow: {
        glass: '0 20px 60px rgba(0, 0, 0, 0.28)',
      },
      backgroundImage: {
        'tech-gradient': 'linear-gradient(to bottom right, #1a1a2e, #2d1b69)',
        'iite-purple-gradient': 'linear-gradient(135deg, #5a3ec7 0%, #8456ff 45%, #b39dff 100%)',
        'hero-glow': 'radial-gradient(circle at top left, rgba(45, 27, 105, 0.24), transparent 30%), radial-gradient(circle at bottom right, rgba(16, 185, 129, 0.18), transparent 28%)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [forms],
}
