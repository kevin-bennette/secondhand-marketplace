import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// Tailwind CSS runs through PostCSS (see postcss.config.js).
export default defineConfig({
  plugins: [react()],
})
