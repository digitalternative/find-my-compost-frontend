<template>
  <v-menu offset-y transition="slide-y-transition" origin="top center">
    <template v-slot:activator="{ props }">
      <v-btn color="primary" dark v-bind="props" class="mx-auto">
        <v-avatar v-if="gravatarExist">
          <img :src="gravatar" alt="user profile image" height="40" />
        </v-avatar>
        <v-avatar color="white" v-else>
          <span class="text-h5">{{ initials }}</span>
        </v-avatar>
      </v-btn>
    </template>

    <v-list v-if="authStatus" class="pa-2 rounded box-shadow">
      <v-list-item
        active-color="primary"
        color="secondary"
        rounded="xl"
        to="/account"
      >
        <v-list-item-avatar left>
          <v-icon icon="mdi-account"></v-icon>
        </v-list-item-avatar>
        <v-list-item-title>Compte</v-list-item-title>
      </v-list-item>
      <v-list-item
        active-color="primary"
        color="error"
        rounded="xl"
        @click="signOutUser"
      >
        <v-list-item-avatar left>
          <v-icon color="error" icon="mdi-logout-variant"></v-icon>
        </v-list-item-avatar>

        <v-list-item-title>Déconnexion</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { mapState, mapActions } from "vuex";
import md5 from "md5";

export default {
  name: "user-menu-component",
  data() {
    return {
      gravatarHash: "",
      gravatarExist: false,
    };
  },
  computed: {
    ...mapState(["user", "authStatus"]),
    gravatar() {
      return `https://www.gravatar.com/avatar/${this.gravatarHash}`;
    },
    initials() {
      const username = this.user.username;
      return username.match(/\b(\w)/g).join("");
    },
  },
  methods: {
    ...mapActions(["signOut"]),
    signOutUser: function () {
      const msg = "<b>" + this.user.username + "</b> déconnecté !";

      this.signOut().then(() => {
        const route = {
          name: "Home",
          params: {
            snackbarText: msg,
            snackbarType: "info",
          },
        };
        this.$router.push(route);
      });
    },
  },
  async created() {
    this.gravatarHash = md5(this.user.email.trim().toLowerCase());
    fetch(`https://www.gravatar.com/avatar/${this.gravatarHash}?d=404`).then(
      (resonse) => {
        if (resonse.status !== 404) {
          this.gravatarExist = true;
        }
      }
    );
  },
};
</script>
