import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Full-Stack---CRUD/', // 👈 this line is required for GitHub Pages
  plugins: [react()],
})
