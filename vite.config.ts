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
      strategies: "injectManifest",
      manifest: {
        name: "Find My Compost",
        short_name: "Find My Compost",
        theme_color: "#ffffff",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        // icons: [
        //   {
        //     src: "icon-192.png",
        //     sizes: "192x192",
        //     type: "image/png",
        //   },
        //   {
        //     src: "/icon-512.png",
        //     sizes: "512x512",
        //     type: "image/png",
        //   },
        //   {
        //     src: "icon-512.png",
        //     sizes: "512x512",
        //     type: "image/png",
        //     purpose: "any maskable",
        //   },
        // ],
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
  /* remove the need to specify .vue files https://vitejs.dev/config/#resolve-extensions
  resolve: {
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ]
  },
  */
});
