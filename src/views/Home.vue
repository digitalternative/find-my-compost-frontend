<template>
  <div class="v-card-container">
    <v-card max-width="600px" class="mx-auto" flat>
      <v-container>
        <v-row dense>
          <v-col cols="12">
            <v-card flat class="pa-5">
              <v-img :src="logoTitle" alt="Find My Compost" max-height="400" />
            </v-card>
          </v-col>

          <v-col cols="12" sm="6">
            <router-link style="text-decoration: none" to="/composts/all">
              <v-btn color="secondary" height="85" width="100%">
                <div class="d-flex flex-no-wrap justify-space-between">
                  <v-card-title class="text-h5"> Explorer </v-card-title>
                  <v-avatar class="ma-3" size="75" rounded="0">
                    <v-img :src="logo"></v-img>
                  </v-avatar>
                </div>
              </v-btn>
            </router-link>
          </v-col>
          <v-col cols="12" sm="6">
            <router-link style="text-decoration: none" :to="getContributeLink">
              <v-btn color="tertiary" height="85" width="100%">
                <div class="d-flex flex-no-wrap justify-space-between">
                  <v-card-title class="text-h5">Contribuer </v-card-title>
                  <v-avatar class="ma-3" size="75" rounded="0">
                    <v-img :src="networkPeople"></v-img>
                  </v-avatar>
                </div>
              </v-btn>
            </router-link>
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
import { mapGetters } from "vuex";
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
    ...mapGetters(["authStatus"]),
    fontSize() {
      const { name } = useDisplay();
      switch (name.value) {
        case "xs":
          return "subheading";
        default:
          return "";
      }
    },
    getContributeLink() {
      return this.authStatus ? "/add-compost" : "/login";
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
