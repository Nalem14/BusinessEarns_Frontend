import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
    css: {
      loaderOptions: {
        scss: {
          additionalData: `@use "sass:math";@import "~@/assets/scss/main.scss";`
        }
      }
    },
  })]
})
