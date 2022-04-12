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
    primary: "#005b4f",
    secondary: "#005cb2",
    error: "#BB2124",
    info: "#6ab7ff",
    success: "#00897b",
    warning: "#F0AD4E",
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
