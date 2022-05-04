// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// Vuetify
import { createVuetify } from "vuetify";

const findMyCompostTheme = {
  dark: true,
  colors: {
    background: "#FFFFFF",
    surface: "#FFFFFF",
    lightgrey: "#F4F4F4",
    primary: "#025959",
    secondary: "#CA1036",
    tertiary: "#FBBA0A",
    success: "#198754",
    info: "#0dcaf0",
    warning: "#ffc107",
    error: "#dc3545",
    /* Color Theme Swatches in Hex */
    // .Au-potager---Jardinier-avec-son-panier-de-récolte-cueillant-des-légumes-d'automne-:-choux-chinois,-citrouille,-poirée-1-hex { color: #3E5902; }
    // .Au-potager---Jardinier-avec-son-panier-de-récolte-cueillant-des-légumes-d'automne-:-choux-chinois,-citrouille,-poirée-2-hex { color: #2C4001; }
    // .Au-potager---Jardinier-avec-son-panier-de-récolte-cueillant-des-légumes-d'automne-:-choux-chinois,-citrouille,-poirée-3-hex { color: #83A603; }
    // .Au-potager---Jardinier-avec-son-panier-de-récolte-cueillant-des-légumes-d'automne-:-choux-chinois,-citrouille,-poirée-4-hex { color: #F27405; }
    // .Au-potager---Jardinier-avec-son-panier-de-récolte-cueillant-des-légumes-d'automne-:-choux-chinois,-citrouille,-poirée-5-hex { color: #F24405; }
  },
};
export default createVuetify(
  {
    theme: {
      defaultTheme: "findMyCompostTheme",
      variations: {
        colors: ["primary", "secondary"],
        lighten: 5,
        darken: 5,
      },
      themes: {
        findMyCompostTheme,
      },
    },
  },
  components,
  directives
);
