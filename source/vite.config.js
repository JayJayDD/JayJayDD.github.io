import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/catalog/",
  plugins: [svelte({experimental: {useVitePreprocess: true}})],
  build: {
    emptyOutDir: false,
  },
})