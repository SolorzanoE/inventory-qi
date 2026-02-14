import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/inventory-qi/",
  resolve: {
    alias: {
      '@src': path.resolve('./src'),
      '@root': path.resolve('./'),
    }
  }
})