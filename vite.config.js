import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Le site sera sur https://oraxelerator.github.io/enchant/
  base: '/enchant/',
})
