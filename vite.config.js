import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const dirname = import.meta.dirname

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/inventory-qi/",
  resolve: {
    alias: {
      '@src': path.resolve(dirname, './src'),
      '@root': path.resolve(dirname, './'),
    }
  }
})