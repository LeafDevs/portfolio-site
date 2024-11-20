import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import webpConverter from './plugins/webp-converter'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), webpConverter()],
})
