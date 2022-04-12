<template>
  <v-app>
    <v-layout>
      <v-app-bar color="primary">
        <v-app-bar-title>
          <router-link
            style="text-decoration: none"
            to="/"
            v-slot="{ href, navigate }"
          >
            <img
              :src="logoSrc"
              alt="Find My Compost"
              height="48"
              :href="href"
              @click="navigate"
            />
          </router-link>
        </v-app-bar-title>
        <v-spacer></v-spacer>

        <template v-slot:append v-if="authStatus">
          <UserMenuComponent />
        </template>
        <template v-slot:append v-else>
          <template v-if="!authStatus">
            <router-link
              style="text-decoration: none"
              to="/login"
              v-slot="{ href, navigate }"
            >
              <v-btn
                color="white"
                dark
                stacked
                variant="contained-text"
                :href="href"
                @click="navigate"
              >
                <v-icon icon="mdi-login"></v-icon>

                Login
              </v-btn>
            </router-link>
          </template>
          <template v-else><Login /></template>
        </template>
      </v-app-bar>

      <v-bottom-navigation
        color="white"
        bg-color="secondary"
        v-model="bottomNav"
      >
        <v-btn to="/" value="home">
          <v-icon size="24">mdi-home</v-icon>
        </v-btn>

        <v-btn to="/composts/all" value="all">
          <v-icon size="24">mdi-map-marker</v-icon>
        </v-btn>
        <v-btn to="/composts/my" v-if="authStatus" value="my">
          <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12 2C8.14 2 5 5.14 5 9C5 14.25 12 22 12 22S19 14.25 19 9C19 5.14 15.86 2 12 2M12 4C13.1 4 14 4.9 14 6C14 7.11 13.1 8 12 8S10 7.11 10 6C10 4.9 10.9 4 12 4M12 14C10.33 14 8.86 13.15 8 11.85C8 10.53 10.67 9.8 12 9.8S16 10.53 16 11.85C15.14 13.15 13.67 14 12 14Z"
            />
          </svg>
        </v-btn>
        <v-btn to="/composts/fav" v-if="authStatus" value="fav">
          <v-icon size="24">mdi-heart</v-icon>
        </v-btn>
      </v-bottom-navigation>
      <v-main>
        <router-view />
      </v-main>
    </v-layout>
  </v-app>
</template>

<script>
import Login from "./views/Login.vue";
import UserMenuComponent from "./components/UserMenuComponent.vue";

import { mapGetters, mapState, mapActions } from "vuex";
import { useDisplay } from "vuetify";
import logo from "@/assets/logo.svg";
import logoTitle from "@/assets/logo_title.svg";

export default {
  name: "App",
  components: {
    Login,
    UserMenuComponent,
  },
  data() {
    return {
      appName: "Find My Compost",
      navigation: 1,
      selectedItem: 0,
      drawer: false,
      group: null,
      state: true,
      bottomNav: "home",
    };
  },
  computed: {
    ...mapGetters(["authStatus"]),
    ...mapState(["user"]),
    logoSrc: function () {
      const { name } = useDisplay();
      switch (name.value) {
        case "xs":
          return logo;
        case "sm":
          return logoTitle;
        case "md":
          return logoTitle;
        case "lg":
          return logoTitle;
        case "xl":
          return logoTitle;
        default:
          return logoTitle;
      }
    },
  },
  methods: {
    ...mapActions(["signIn"]),
  },
  beforeCreate() {
    this.$store.commit("initialiseStorage");
  },
  watch: {
    "$route.path": {
      handler: function (path) {
        if (path.split("/").pop()) {
          this.bottomNav = path.split("/").pop();
        } else {
          this.bottomNav = "home";
        }
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style>
@import "./assets/main.css";
</style>
