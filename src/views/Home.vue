<template>
  <div class="v-card-container">
    <v-card max-width="600px" class="mx-auto" flat>
      <v-container>
        <v-row dense>
          <v-col cols="12">
            <v-card color="secondary-darken-1" class="pa-5">
              <v-img :src="logoTitle" alt="Find My Compost" max-height="400" />

              <v-card-title class="float-right">
                Trouver votre compost !
              </v-card-title>
            </v-card>
          </v-col>

          <v-col cols="12">
            <v-card color="primary">
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title class="text-h5">Explorer </v-card-title>

                  <v-card-subtitle
                    >Trouver maintenant un compost près de chez vous et
                    contacter le manager du compost dès
                    maintenant!</v-card-subtitle
                  >

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <router-link
                      style="text-decoration: none"
                      to="/composts/all"
                    >
                      <v-btn color="success" text> Explorer </v-btn>
                    </router-link>
                  </v-card-actions>
                </div>

                <v-avatar class="ma-3" size="125" rounded="0">
                  <v-img :src="logo"></v-img>
                </v-avatar>
              </div>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card color="secondary">
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title class="text-h5">Contribuer </v-card-title>

                  <v-card-subtitle
                    >Connecter vous et ajouter votre compost afin d'en faire
                    profiter la collectivité.</v-card-subtitle
                  >

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <router-link style="text-decoration: none" to="/login">
                      <v-btn color="success" text> Se Connecter </v-btn>
                    </router-link>
                  </v-card-actions>
                </div>

                <v-avatar class="ma-3" size="125" rounded="0">
                  <v-img :src="networkPeople"></v-img>
                </v-avatar>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>

    <CustomSnackBarComponent
      :snackbar="snackbar"
      @clearSnackbar="snackbar.text = ''"
    />
  </div>
</template>
<script>
import CustomSnackBarComponent from "../components/CustomSnackBarComponent.vue";
import logo from "@/assets/logo.svg";
import logoTitle from "@/assets/logo_title.svg";
import networkPeople from "@/assets/network-people.png";
import { useDisplay } from "vuetify";

export default {
  name: "home-view",
  components: {
    CustomSnackBarComponent,
  },
  props: {
    snackbarText: String,
    snackbarType: String,
  },
  data: () => ({
    snackbar: {
      text: "",
      type: "info",
    },
    logo: logo,
    logoTitle: logoTitle,
    networkPeople: networkPeople,
  }),
  computed: {
    fontSize() {
      const { name } = useDisplay();
      switch (name.value) {
        case "xs":
          return "subheading";
        default:
          return "";
      }
    },
  },
  mounted() {
    if (this.snackbarText && this.snackbarType) {
      this.snackbar.text = this.snackbarText;
      this.snackbar.type = this.snackbarType;
    }
  },
};
</script>
<style>
.subheading {
  font-size: 0.9em;
}
</style>
