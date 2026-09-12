import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import glsl from "vite-plugin-glsl"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    glsl(),
    {
      name: 'github-pages-fallback',
      apply: 'build',
      generateBundle: {
        order: 'post',
        handler(_options, bundle) {
          // Pages serves this app shell for direct visits to client-side routes.
          const index = bundle['index.html'];
          if (!index || index.type !== 'asset') {
            this.error('Missing index.html for the GitHub Pages fallback');
          }
          this.emitFile({ type: 'asset', fileName: '404.html', source: index.source });
        },
      },
    },
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  assetsInclude: ['**/*.glb'],
})
