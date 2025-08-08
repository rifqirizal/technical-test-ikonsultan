import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import * as path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss({
      config: {
        content: ['./src/**/*.{js,jsx,ts,tsx}'],
        theme: {
          extend: {},
        },
        plugins: [],
      },
    }),
  ],
   resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
})
