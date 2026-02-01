import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({ 
      include: ['src/lib'],
      insertTypesEntry: true,
    })
  ],
  build: {
    copyPublicDir: false, // Don't copy public assets for library build
    lib: {
      entry: resolve(__dirname, 'src/lib/index.ts'),
      name: 'GooglePlacesWidgets',
      fileName: (format) => `google-places-widgets.${format}.js`,
    },
    rollupOptions: {
      // Make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
})