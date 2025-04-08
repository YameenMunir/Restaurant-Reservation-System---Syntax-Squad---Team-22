import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Add the base option with the name of your repository
  base: '/Restaurant-Reservation-System---Syntax-Squad---Team-22/',
})
