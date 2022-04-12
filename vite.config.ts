import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from "@vuetify/vite-plugin";
import vueJsx from "@vitejs/plugin-vue-jsx";
import ViteFonts from "vite-plugin-fonts";

const path = require("path");

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
  ],
  server: {
    host: true,
    port: 8080,
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

// this.ROLLUP_NAMED_EXPORTS = [
//   ...this.ROLLUP_NAMED_EXPORTS,
//   { "node_modules/leaflet/dist/leaflet.js": ["leaflet"] },
//   { "node_modules/leaflet/dist/leaflet-src.js": ["latLng", "map", "control"] },
// ];
