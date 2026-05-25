import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    target: 'esnext',
    chunkSizeWarningLimit: 2000,
    minify: 'esbuild',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three') || id.includes('@react-three')) return 'three-vendor';
            if (id.includes('framer-motion')) return 'framer-vendor';
            if (id.includes('react-dom')) return 'react-dom-vendor';
            if (id.includes('react-router')) return 'router-vendor';
            return 'vendor';
          }
        },
      },
    },
  },
  esbuild: {
    legalComments: 'none',
    target: 'esnext',
  },
})
