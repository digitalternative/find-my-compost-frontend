/* eslint-disable @typescript-eslint/no-explicit-any */
<template>
  <div class="v-card-container">
    <v-card class="my-5 mx-5" flat>
      <v-card-header>
        <div>
          <div class="text-h6 mb-1">Connexion</div>
        </div>
      </v-card-header>
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
                :href="VITE_BACKEND_URI + '/login/facebook'"
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
                :href="VITE_BACKEND_URI + '/login/google'"
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
                variant="outlined"
                density="compact"
                v-model="email"
                label="Courriel"
                required
              ></v-text-field>
              <v-text-field
                variant="outlined"
                density="compact"
                :append-inner-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append-inner="showPass = !showPass"
                v-model="password"
                label="Mot de passe"
                :type="showPass ? 'text' : 'password'"
                required
              ></v-text-field>
              <p class="hint-text" align="center">
                <router-link
                  class="nav-link active"
                  aria-current="page"
                  to="/signup"
                  @click="loginDialog = false"
                  >Créer un compte</router-link
                >
              </p>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" text @click="loginUser()"> Connexion </v-btn>
      </v-card-actions>
      <p class="error-msg" align="center" v-if="error">{{ error }}</p>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  name: "login-view",

  data() {
    return {
      showPass: false,
      error: "",
      email: "",
      password: "",
      loginDialog: false,
    };
  },
  computed: {
    ...mapState(["user"]),
    ...mapGetters(["authStatus"]),
    VITE_BACKEND_URI() {
      return import.meta.env.VITE_BACKEND_URI;
    },
  },
  methods: {
    ...mapActions(["signIn", "setStoreInfo"]),

    loginUser(social = "") {
      this.signIn({
        username: this.email,
        password: this.password,
        social: social,
      })
        .then(() => {
          this.redirectAfterLogin();
        })
        .catch((error) => {
          this.error = error;
        });
    },
    closeDialog() {
      this.$emit("closeDialog");
    },
    redirectAfterLogin() {
      const msg = "<b>" + this.user.username + "</b> connecté !";
      const route = {
        name: "Home",
        params: {
          snackbarText: msg,
          snackbarType: "info",
        },
      };
      this.$router.push(route);
    },
  },
  async created() {
    if (this.$route.query.payload) {
      const payload = JSON.parse(this.$route.query.payload);
      console.log(payload);
      await this.setStoreInfo(payload);
    }
  },
  watch: {
    authStatus: {
      handler(isAuthenticated) {
        if (isAuthenticated) this.redirectAfterLogin();
      },
      deep: true,
    },
  },
};
</script>
