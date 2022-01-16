import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    resolve: {
      alias: {
        vue: "vue/dist/vue.esm-browser.js",
        "@": resolve(__dirname, "src"),
        "~": resolve(__dirname, "node_modules/"),
      },
    },
    plugins: [vue({})],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "sass:math";@import "@/assets/scss/main.scss";`,
        },
      },
    },
    server: {
      proxy: {
        '/api': {
          target: process.env.VITE_APP_BASE_API_URI,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
      },
    },
  });
};