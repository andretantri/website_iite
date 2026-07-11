import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import localCmsPlugin from './vite-plugin-local-cms'

export default defineConfig({
  plugins: [react(), localCmsPlugin()],
  server: {
    port: 4173,
    open: true,
  },
})
