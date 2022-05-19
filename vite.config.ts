import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from "@vuetify/vite-plugin";
import vueJsx from "@vitejs/plugin-vue-jsx";
import ViteFonts from "vite-plugin-fonts";
import { VitePWA } from "vite-plugin-pwa";
import mkcert from "vite-plugin-mkcert";

import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
    }),
    vueJsx(),
    ViteFonts({
      google: {
        families: ["Roboto", "Montserrat"],
      },
    }),
    VitePWA({
      filename: "sw.ts",
      registerType: "autoUpdate",
      includeAssets: ["/favicon.png"],
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
        cleanupOutdatedCaches: true,
        sourcemap: true,
      },
      srcDir: "src",
      strategies: "generateSW",
      manifest: {
        name: "Find My Compost",
        short_name: "Find My Compost",
        description:
          "Application collaborative qui à pour vocation de promouvoir les composts collectifs",
        start_url: "/find-my-compost/",
        display: "standalone",
        background_color: "#ffffff",
        lang: "fr",
        scope: "/find-my-compost/",
        theme_color: "#002f30",
        screenshots: [
          {
            src: "/screenshot-1.png",
            sizes: "750x1334",
            type: "image/png",
          },
          {
            src: "/screenshot-2.png",
            sizes: "750x1334",
            type: "image/png",
          },
          {
            src: "/screenshot-3.png",
            sizes: "1280x800",
            type: "image/png",
          },
          {
            src: "/screenshot-4.png",
            sizes: "750x1334",
            type: "image/png",
          },
        ],
        icons: [
          {
            src: "/icon-48x48.png",
            sizes: "48x48",
            type: "image/png",
            purpose: "maskable any",
          },
          {
            src: "/icon-72x72.png",
            sizes: "72x72",
            type: "image/png",
            purpose: "maskable any",
          },
          {
            src: "/icon-96x96.png",
            sizes: "96x96",
            type: "image/png",
            purpose: "maskable any",
          },
          {
            src: "/icon-128x128.png",
            sizes: "128x128",
            type: "image/png",
            purpose: "maskable any",
          },
          {
            src: "/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable any",
          },
          {
            src: "/icon-384x384.png",
            sizes: "384x384",
            type: "image/png",
            purpose: "maskable any",
          },
          {
            src: "/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable any",
          },
          {
            src: "/icon-1024x1024.png",
            sizes: "1024x1024",
            type: "image/png",
            purpose: "maskable any",
          },
        ],
      },
    }),
    mkcert(),
  ],
  build: {
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  },
  server: {
    host: true,
    port: 8080,
  },
  define: { "process.env": {} },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "node_modules"),
      "@": path.resolve(__dirname, "src"),
    },
  },
});
