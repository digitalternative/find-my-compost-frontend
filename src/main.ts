import { createApp, provide, h } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as apolloProvider from "./apollo.provider.js";
import { DefaultApolloClient } from "@vue/apollo-composable";

import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";

loadFonts();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js", { scope: "/" });
}
const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloProvider.apolloClient);
  },

  render: () => h(App),
});

store.subscribe((mutation, state) => {
  // Store the state object as a JSON string
  localStorage.setItem("store", JSON.stringify(state));
});

app.use(vuetify);
app.use(store);
app.use(router);
app.mount("#app");
