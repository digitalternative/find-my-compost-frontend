<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      variant="outlined"
      density="compact"
      v-model="username"
      :counter="10"
      :rules="usernameRules"
      label="Nom d'utilisateur"
      required
    ></v-text-field>
    <v-text-field
      variant="outlined"
      density="compact"
      v-model="email"
      :rules="emailRules"
      label="Courriel"
      required
    ></v-text-field>
    <template v-if="user">
      <v-switch
        color="primary"
        v-model="updatePassword"
        label="Modifier le mot de passe"
      ></v-switch>
      <template v-if="updatePassword">
        <v-text-field
          variant="outlined"
          density="compact"
          v-model="oldPassword"
          :append-icon="showPassOld ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[passwordOldRules]"
          :type="showPassOld ? 'text' : 'password'"
          name="input-10-1"
          label="Ancient mot de passe"
          hint="Au moins 8 caractéres"
          counter
          @click:append="showPassOld = !showPassOld"
        ></v-text-field>
        <v-text-field
          variant="outlined"
          density="compact"
          v-model="password"
          :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="passwordRules"
          :type="showPass ? 'text' : 'password'"
          name="input-10-1"
          label="Nouveau mot de passe"
          hint="Au moins 8 caractéres"
          counter
          @click:append="showPass = !showPass"
        ></v-text-field>

        <v-text-field
          variant="outlined"
          density="compact"
          v-model="passwordConfirm"
          :append-icon="showPassConfirm ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[passwordConfirmRules]"
          :type="showPassConfirm ? 'text' : 'password'"
          name="input-10-1"
          label="Confirmation du mot de passe"
          hint="Au moins 8 caractéres"
          counter
          @click:append="showPassConfirm = !showPassConfirm"
        ></v-text-field>
      </template>
    </template>
    <template v-else>
      <v-text-field
        variant="outlined"
        density="compact"
        v-model="password"
        :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="passwordRules"
        :type="showPass ? 'text' : 'password'"
        name="input-10-1"
        label="Mot de passe"
        hint="Au moins 8 caractéres"
        counter
        @click:append="showPass = !showPass"
      ></v-text-field>

      <v-text-field
        variant="outlined"
        density="compact"
        v-model="passwordConfirm"
        :append-icon="showPassConfirm ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[passwordConfirmRules]"
        :type="showPassConfirm ? 'text' : 'password'"
        name="input-10-1"
        label="Confirmation du mot de passe"
        hint="Au moins 8 caractéres"
        counter
        @click:append="showPassConfirm = !showPassConfirm"
      ></v-text-field>
    </template>

    <v-checkbox
      v-if="!user"
      v-model="validTermCondition"
      :rules="[
        (v) => !!v || 'Vous devez accepter les conditions pour continuer',
      ]"
      label="J'accept les termes et conditions"
      required
    ></v-checkbox>
  </v-form>
  <v-card-actions v-if="user">
    <v-spacer></v-spacer>
    <v-btn color="error" @click="submitRemoveUser(user.email)">
      Supprimer
    </v-btn>
    <v-btn color="success" @click="submitUpdateUser()"> Sauver </v-btn>
  </v-card-actions>
  <v-card-actions v-else>
    <v-spacer></v-spacer>
    <v-btn color="success" @click="submitRegisterUser()"> S'enregistrer </v-btn>
  </v-card-actions>
  <ConfirmDialogComponent ref="confirm" />
  <CustomSnackBarComponent
    :snackbar="snackbar"
    @clearSnackbar="snackbar.text = ''"
  />
</template>

<script>
import { mapActions } from "vuex";
import CustomSnackBarComponent from "../components/CustomSnackBarComponent.vue";
import ConfirmDialogComponent from "../components/ConfirmDialogComponent.vue";

export default {
  name: "registration-vue",
  components: {
    CustomSnackBarComponent,
    ConfirmDialogComponent,
  },
  props: {
    user: {
      type: Object,
    },
  },
  data: () => ({
    valid: false,
    showPass: false,
    showPassConfirm: false,
    showPassOld: false,
    username: "",
    usernameRules: [(v) => !!v || "", (v) => (v && v.length <= 20) || ""],
    email: "",
    emailRules: [
      (v) => !!v || "Le courriel est requis",
      (v) => /.+@.+\..+/.test(v) || "Le courriel doit être correct",
    ],
    oldPassword: "",
    password: "",
    passwordConfirm: "",
    passwordRules: [
      (v) =>
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(v) ||
        "Mot de passe trop faible",
      (v) => !!v || "Mot de passe requis",
    ],

    validTermCondition: true,
    snackbar: {
      text: "",
      type: "info",
    },
    updatePassword: false,
  }),
  computed: {
    passwordConfirmRules() {
      if (this.password === this.passwordConfirm) {
        return true;
      } else {
        return "Le mot de passe ne correspond pas";
      }
    },
  },
  methods: {
    ...mapActions([
      "signUp",
      "updateUser",
      "removeUserCompost",
      "removeUser",
      "signOut",
      "checkPassword",
    ]),
    async passwordOldRules() {
      console.log(this.oldPassword);
      const res = await this.checkPassword({ password: this.oldPassword });

      if (!res) return await "L'ancient mot de pass n'est pas correct.";
      return await res;
    },
    async submitRegisterUser() {
      const isValid = await this.$refs.form.validate();
      if (isValid.valid) {
        this.signUp({
          username: this.username,
          email: this.email,
          password: this.password,
          passwordConfirm: this.passwordConfirm,
          roles: ["user"],
        })
          .then(() => {
            const route = {
              name: "Home",
              params: {
                snackbarText: "Utilisateur <b>" + this.username + "</b> créé !",
                snackbarType: "success",
              },
            };
            this.$router.push(route);
          })
          .catch((error) => {
            if (error.graphQLErrors) {
              var mongoMsg = error.graphQLErrors[0].message;
              if (mongoMsg.search("email_1 dup key") > 1) {
                this.snackbar = {
                  type: "warning",
                  text: "Courriel existe déjà !",
                };
              }
            }
          });
      }
    },
    async submitUpdateUser() {
      const isValid = await this.$refs.form.validate();
      let inputPasswords = {};
      if (this.password) {
        inputPasswords = {
          password: this.password,
          passwordConfirm: this.passwordConfirm,
        };
      }
      if (isValid.valid) {
        this.updateUser({
          _id: this.user._id,
          username: this.username,
          email: this.email,
          roles: ["user"],
          ...inputPasswords,
        })
          .then(() => {
            const route = {
              name: "Home",
              params: {
                snackbarText:
                  "Utilisateur <b>" + this.username + "</b> mis à jour !",
                snackbarType: "success",
              },
            };
            this.$router.push(route);
          })
          .catch((error) => {
            if (error.graphQLErrors) {
              var mongoMsg = error.graphQLErrors[0].message;
              if (mongoMsg.search("email_1 dup key") > 1) {
                this.snackbar = {
                  type: "warning",
                  text: "L'ancient mot de passe ne correspond pas.",
                };
              }
            }
          });
      }
    },
    async submitRemoveUser(email) {
      if (
        await this.$refs.confirm.open(
          "Suppression du compte",
          "Êtes vous sûr de vouloir supprimer votre compte ? ",
          {
            color: "error",
            warning: "Les composts associés au compte seront supprimés !",
            btn: "Supprimer",
          }
        )
      ) {
        this.removeUserCompost()
          .then(() => {
            this.removeUser(email).then(() => {
              this.signOut().then(() => {
                const route = {
                  name: "Home",
                  params: {
                    snackbarText: "<b>" + email + "</b> supprimé !",
                    snackbarType: "error",
                  },
                };
                this.$router.push(route);
              });
            });
          })
          .catch((err) => {
            this.snackbar = {
              type: "error",
              text: err,
            };
          });
      }
    },
  },
  mounted() {
    if (this.user) {
      this.username = this.user.username;
      this.email = this.user.email;
    }
  },
};
</script>
