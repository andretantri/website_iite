import forms from '@tailwindcss/forms'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,jsx}'],
  safelist: [
    'text-iite-cyan', 'text-iite-green', 'text-iite-purple', 'text-amber-400', 'text-rose-400',
    'bg-iite-cyan', 'bg-iite-green', 'bg-iite-purple', 'bg-amber-400', 'bg-rose-400',
    'border-iite-cyan/50', 'border-iite-green/50', 'border-iite-purple/50', 'border-amber-400/50', 'border-rose-400/50',
    'border-iite-cyan/30', 'border-iite-green/30', 'border-iite-purple/30', 'border-amber-400/30', 'border-rose-400/30',
    'bg-iite-cyan/10', 'bg-iite-green/10', 'bg-iite-purple/10', 'bg-amber-400/10', 'bg-rose-400/10',
    'hover:border-iite-cyan', 'hover:border-iite-green', 'hover:border-iite-purple', 'hover:border-amber-400', 'hover:border-rose-400',
    'hover:bg-iite-cyan/20', 'hover:bg-iite-green/20', 'hover:bg-iite-purple/20', 'hover:bg-amber-400/20', 'hover:bg-rose-400/20',
    'hover:bg-iite-cyan/80', 'hover:bg-iite-green/80', 'hover:bg-iite-purple/80', 'hover:bg-amber-400/80', 'hover:bg-rose-400/80',
    'hover:border-iite-cyan/40', 'hover:border-iite-green/40', 'hover:border-iite-purple/40', 'hover:border-amber-400/40', 'hover:border-rose-400/40',
    'from-iite-cyan', 'from-iite-green', 'from-iite-purple', 'from-amber-400', 'from-rose-400',
    'from-cyan-500/20', 'from-emerald-500/20', 'from-purple-500/20', 'from-amber-500/20', 'from-rose-500/20',
    'from-emerald-500/10', 'from-purple-500/10', 'from-amber-500/10',
    'from-iite-purple/30', 'from-iite-purple/10',
  ],
  theme: {
    extend: {
      colors: {
        'iite-dark': '#3b0e3dff',
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
