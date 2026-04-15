# IITE 2026 SPA

React + Vite + Tailwind single-page website for the International Innovation Technology Expo 2026.

## Features

- Responsive SPA layout with glassmorphism and purple/cyan accent colors
- Dark/light mode toggle
- Indonesian and English bilingual support
- Countdown timer and featured slider
- Section navigation for Hero, About, Activities, Timeline, and Contact
- Smooth reveal animations using `IntersectionObserver`

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Lucide React icons

## Getting Started

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

Open the local URL shown in the terminal.

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Project Structure

- `src/`
  - `App.jsx` — root app and theme/language provider
  - `main.jsx` — entry point
  - `index.css` — Tailwind base and custom global styles
  - `i18n.js` — language translations and hooks
  - `components/` — page sections and widgets

## Language Support

- Default first access language is English
- Switch between English and Indonesian from the navbar button
- Language preference is saved in `localStorage`

## Notes

- Theme preference is also persisted in `localStorage`
- The app uses a `fade-up` class and `IntersectionObserver` for scroll reveal effects
