/* eslint-disable @typescript-eslint/no-explicit-any */
<template>
  <v-dialog v-model="loginDialog" persistent @keydown.esc="closeDialog()">
    <template v-slot:activator="{ props }" v-if="!authStatus">
      <v-btn
        color="primary"
        dark
        v-bind="props"
        stacked
        variant="contained-text"
      >
        <v-icon icon="mdi-login"></v-icon>

        Login
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Connexion</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <p class="hint-text" align="center">
                Connecter vous avec votre réseau social
              </p>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-btn
                flat
                href="http://localhost:3000/auth/facebook"
                color="primary"
                class="facebook-btn"
                width="100%"
              >
                <v-icon large color="white"> mdi-facebook </v-icon>
              </v-btn>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-btn
                flat
                href="http://localhost:3000/auth/google"
                color="primary"
                class="google-btn"
                width="100%"
              >
                <v-icon large color="white"> mdi-google </v-icon>
              </v-btn>
            </v-col>
          </v-row>

          <v-row align="center" justify="center">
            <v-col cols="3" align="center" justify="center">
              <div class="or-seperator">
                <b>ou</b>
              </div>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="email"
                label="Email*"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="password"
                label="Password*"
                type="password"
                required
              ></v-text-field>
              <small>*indicates required field</small>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <p class="hint-text" align="center">
                <router-link
                  class="nav-link active"
                  aria-current="page"
                  to="/signup"
                  @click="loginDialog = false"
                  >Créer un compte</router-link
                >
              </p>
              <p class="error-msg" align="center" v-if="error">{{ error }}</p>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" text @click="loginDialog = false"> Fermer </v-btn>
        <v-btn color="primary" text @click="loginUser()"> Connexion </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "login-component",

  data() {
    return {
      error: "",
      email: "",
      password: "",
      loginDialog: false,
    };
  },
  computed: {
    ...mapGetters(["authStatus"]),
    getIsAuthenticated() {
      return this.authStatus;
    },
  },
  methods: {
    ...mapActions(["signIn"]),

    loginUser() {
      this.signIn({ username: this.email, password: this.password })
        .then(() => {
          (this.dialog = false), this.$router.push({ path: "/" });
        })
        .catch((error) => {
          this.error = error;
        });
    },
    closeDialog() {
      this.$emit("closeDialog");
    },
  },

  created() {
    this.email = "chastre-composte@mail.be";
    this.password = "@Azerty_123456";
    this.$nextTick(function () {
      if (!this.authStatus && document.cookie) {
        const parseCookie = (str) =>
          str
            .split(";")
            .map((v) => v.split("="))
            .reduce((acc, v) => {
              acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(
                v[1].trim()
              );
              return acc;
            }, {});

        let socialUser = null;

        const cookie = parseCookie(document.cookie);
        if (cookie.googleUser) {
          socialUser = JSON.parse(cookie.googleUser);
        } else if (cookie.facebookUser) {
          socialUser = JSON.parse(cookie.facebookUser);
        }

        if (socialUser !== null) {
          if (socialUser.error) {
            this.error = socialUser.error;
          } else {
            this.signIn(socialUser)
              .then(() => {
                this.$router.push("/");
              })
              .catch((error) => {
                this.error = error;
              });
          }
        }
      }
    });
  },
};
</script>
