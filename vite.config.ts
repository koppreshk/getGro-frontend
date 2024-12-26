import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'
import checker from 'vite-plugin-checker'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    checker({
      typescript: true,
    }),
    svgr({
      svgrOptions: {
        exportType: 'default'
      },
    })],
  server: {
    open: true
  },
  build: {
    commonjsOptions: { transformMixedEsModules: true } // Change
  },
  base: '/',
})
