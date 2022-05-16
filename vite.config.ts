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
      devOptions: {
        enabled: true,
        /* other options */
      },
      base: "/",
      srcDir: "src",
      filename: "sw.ts",
      workbox: {
        swDest: "sw.ts",
        maximumFileSizeToCacheInBytes: 5000000,
      },
      includeAssets: ["/favicon.png"],
      strategies: "generateSW",
      registerType: "autoUpdate",
      manifest: {
        name: "Find My Compost",
        short_name: "Find My Compost",
        description:
          "Application collaborative qui à pour vocation de promouvoir les composts collectifs",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        lang: "fr",
        scope: "/",
        theme_color: "#ffffff",
        screenshots: [
          {
            src: "/screenshots/screenshot-1.png",
            sizes: "750x1334",
            type: "image/png",
          },
          {
            src: "/screenshots/screenshot-2.png",
            sizes: "750x1334",
            type: "image/png",
          },
          {
            src: "/screenshots/screenshot-3.png",
            sizes: "1280x800",
            type: "image/png",
          },
          {
            src: "/screenshots/screenshot-4.png",
            sizes: "750x1334",
            type: "image/png",
          },
        ],
        icons: [
          {
            src: "/icons/icon-48x48.png",
            sizes: "48x48",
            type: "image/png",
            purpose: "maskable any",
          },
          {
            src: "/icons/icon-72x72.png",
            sizes: "72x72",
            type: "image/png",
            purpose: "maskable any",
          },
          {
            src: "/icons/icon-96x96.png",
            sizes: "96x96",
            type: "image/png",
            purpose: "maskable any",
          },
          {
            src: "/icons/icon-128x128.png",
            sizes: "128x128",
            type: "image/png",
            purpose: "maskable any",
          },
          {
            src: "/icons/icon-144x144.png",
            sizes: "144x144",
            type: "image/png",
            purpose: "maskable any",
          },
          {
            src: "/icons/icon-152x152.png",
            sizes: "152x152",
            type: "image/png",
            purpose: "maskable any",
          },
          {
            src: "/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable any",
          },
          {
            src: "/icons/icon-384x384.png",
            sizes: "384x384",
            type: "image/png",
            purpose: "maskable any",
          },
          {
            src: "/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable any",
          },
        ],
      },
    }),
    mkcert(),
  ],
  server: {
    host: true,
    port: 8080,
    cors: true,
    https: true,
  },
  define: { "process.env": {} },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
