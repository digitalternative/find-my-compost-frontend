<template>
  <v-app>
    <v-layout>
      <v-app-bar>
        <v-app-bar-nav-icon
          variant="text"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
        <v-app-bar-title>Find My Compost</v-app-bar-title>
        <v-spacer></v-spacer>

        <template v-slot:append v-if="authStatus">
          <v-list-item
            two-line
            :prepend-avatar="user.avatar"
            :title="user.username"
            subtitle="Logged in"
          ></v-list-item>
        </template>
        <template v-slot:append v-else>
          <Login />
        </template>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" bottom temporary>
        <CompostListComponent />

        <template v-slot:append>
          <div class="pa-2" v-if="authStatus">
            <v-btn v-on:click="signOutUser" block> Logout </v-btn>
          </div>
        </template>
      </v-navigation-drawer>

      <v-main>
        <router-view />
      </v-main>

      <v-bottom-navigation :value="value" color="primary">
        <v-btn value="composts" to="/">
          <v-icon size="24">mdi-home</v-icon>
        </v-btn>

        <v-btn value="composts" to="/composts/all">
          <v-icon size="24">mdi-map-marker</v-icon>
        </v-btn>

        <v-btn value="mycomposts" to="/composts/my" v-if="authStatus">
          <svg style="width: 24px; height: 24px" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M12 2C8.14 2 5 5.14 5 9C5 14.25 12 22 12 22S19 14.25 19 9C19 5.14 15.86 2 12 2M12 4C13.1 4 14 4.9 14 6C14 7.11 13.1 8 12 8S10 7.11 10 6C10 4.9 10.9 4 12 4M12 14C10.33 14 8.86 13.15 8 11.85C8 10.53 10.67 9.8 12 9.8S16 10.53 16 11.85C15.14 13.15 13.67 14 12 14Z"
            />
          </svg>
        </v-btn>
      </v-bottom-navigation>
    </v-layout>
  </v-app>
</template>

<script>
import Login from "./components/LoginComponent.vue";
import CompostListComponent from "./components/CompostListComponent.vue";
import { mapGetters, mapState, mapActions } from "vuex";

export default {
  name: "App",
  components: {
    Login,
    CompostListComponent,
  },

  data() {
    return {
      appName: "Find My Compost",
      selectedItem: 0,
      drawer: false,
      group: null,
      state: true,
      value: 1,
    };
  },
  computed: {
    ...mapGetters(["authStatus"]),
    ...mapState(["user"]),
  },
  methods: {
    ...mapActions(["signOut", "setUser"]),
    signOutUser: function () {
      this.signOut().then(() => this.$router.push("/"));
    },
  },

  beforeCreate() {
    this.$store.commit("initialiseStorage");

    //@todo check valid token
  },
};
</script>

<style>
@import "./assets/main.css";
</style>
