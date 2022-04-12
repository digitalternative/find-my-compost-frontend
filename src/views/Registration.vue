<template>
  <div id="registration-container">
    <v-card class="mx-auto my-5" max-width="344">
      <v-card-header>
        <div>
          <div class="text-h6 mb-1">S'enregistrer</div>
          <div class="text-caption">
            Veuillez remplir le formulaire ci-dessous afin de vous enregistrer.
          </div>
        </div>
      </v-card-header>
      <v-card-text>
        <v-container>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field
              v-model="username"
              :counter="10"
              :rules="usernameRules"
              label="Username"
              required
            ></v-text-field>

            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>

            <v-text-field
              v-model="password"
              :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="passwordRules"
              :type="showPass ? 'text' : 'password'"
              name="input-10-1"
              label="Password"
              hint="At least 8 characters"
              counter
              @click:append="showPass = !showPass"
            ></v-text-field>

            <v-text-field
              v-model="passwordConfirm"
              :append-icon="showPassConfirm ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[passwordConfirmRules]"
              :type="showPassConfirm ? 'text' : 'password'"
              name="input-10-1"
              label="Confirmation password"
              hint="At least 8 characters"
              counter
              @click:append="showPassConfirm = !showPassConfirm"
            ></v-text-field>

            <v-checkbox
              v-model="validTermCondition"
              :rules="[(v) => !!v || 'You must agree to continue!']"
              label="I accept the Terms Conditions"
              required
            ></v-checkbox>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn size="large" color="success" @click="registerUser">
          S'enregistrer
        </v-btn>
      </v-card-actions>

      <v-dialog v-model="messageDialog">
        <v-card>
          <v-card-text>
            <v-alert density="compact" variant="outlined" :type="message.type">
              <p v-for="text in message.text" :key="text">
                {{ text }}
              </p>
            </v-alert>
          </v-card-text>
          <v-card-actions v-if="message.type == 'sucess'">
            <v-btn color="primary" block @click="clearMessages;">
              Se connecter
            </v-btn>
          </v-card-actions>
          <v-card-actions v-else>
            <v-btn color="primary" block @click="clearMessages"> OK </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "registration-vue",
  data: () => ({
    valid: false,
    showPass: false,
    showPassConfirm: false,
    username: "Toto",
    usernameRules: [
      (v) => !!v || "Username is required",
      (v) =>
        (v && v.length <= 10) || "Username must be less than 10 characters",
    ],
    email: "toto@gmail.com",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    password: "@Whsimbo44",
    passwordConfirm: "@Whsimbo44",
    passwordRules: [
      (v) =>
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(v) ||
        "Password too weak",
      (v) => !!v || "Password is required",
    ],

    validTermCondition: true,
    message: {
      type: "",
      text: [],
    },
  }),
  computed: {
    messageDialog: function () {
      if (this.message.text.length > 0) {
        return true;
      }
      return false;
    },
    passwordConfirmRules() {
      if (this.password === this.passwordConfirm) {
        return true;
      } else {
        return "Passwords does not match.";
      }
    },
  },
  methods: {
    ...mapActions(["signUp"]),
    clearMessages() {
      this.message.text = [];
    },
    async registerUser() {
      const isValid = await this.$refs.form.validate();

      if (isValid.valid) {
        this.signUp({
          username: this.username,
          email: this.email,
          password: this.password,
          passwordConfirm: this.passwordConfirm,
          roles: ["user"],
        })
          .then((email) => {
            this.message = {
              type: "success",
              text: ["Account " + email + " created !"],
            };
          })
          .catch((error) => {
            if (error.graphQLErrors) {
              var mongoMsg = error.graphQLErrors[0].message;
              if (mongoMsg.search("email_1 dup key") > 1) {
                this.message = {
                  type: "warning",
                  text: ["Email already exist"],
                };
              }
            } else if (error.graphQLErrors[0].extensions.response) {
              this.message = {
                type: "error",
                text: [...error.graphQLErrors[0].extensions.response.message],
              };
            } else {
              this.message = {
                type: "error",
                text: [error],
              };
            }
          });
      }
    },
  },
};
</script>
