import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        // Daftarkan kedua-dua fail HTML di sini
        main: resolve(__dirname, 'index.html'),
        portal: resolve(__dirname, 'main.html'),
      },
    },
  },
})
