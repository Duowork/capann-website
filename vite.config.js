import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // Project Pages deploy to https://romeopeter.github.io/capann-website/
  base: '/capann-website/',
  plugins: [react(), tailwindcss()],
})
