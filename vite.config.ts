import path from "node:path";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import vueDevTools from "vite-plugin-vue-devtools";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), vueDevTools(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      // Проксирование запросов на /auth/login
      "/auth/login": {
        target: "http://16.170.242.6:8080",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/auth/, "/auth"), // можно опционально менять путь
      },
      // Проксирование всех запросов на /api/*
      "/api": {
        target: "http://16.170.242.6:8080",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, "/api"), // можно опционально менять путь
      },
    },
  },
});
