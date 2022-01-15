import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  alias: {
    vue: "vue/dist/vue.esm-browser.js",
    "@": resolve(__dirname, "src"),
    "~": resolve(__dirname, "node_modules/"),
  },
  plugins: [vue({})],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "sass:math";@import "@/assets/scss/main.scss";`,
      },
    },
  },
});
