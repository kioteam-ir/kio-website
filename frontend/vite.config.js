import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: '0.0.0.0',
    allowedHosts: ['kioteam.ir', 'www.kioteam.ir'],
  },
  // server: {
  //   proxy: {
  //     '/api': 'localhost:8000'
  //   }
  // }
})
