import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import {fileURLToPath, URL} from "node:url";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/permission': {
        target: 'http://localhost:58890',
        changeOrigin: true,
        rewrite: path => path.replace('', '')
      },
      '/management':{
        target: 'http://localhost:58889',
        changeOrigin: true,
        rewrite: path => path.replace('', '')
      }
    }
  },
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString()
          }
        },
        entryFileNames: 'assets/js[name].[hash].js',
        chunkFileNames: 'assets/js[name].[hash].js',
        assetFileNames: 'assets/[ext]/[name].[hash].[ext]'
      }
    },
    outDir: 'webExecutor'
  }
})
