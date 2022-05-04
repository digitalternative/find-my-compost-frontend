<template>
  <div class="container">
    <v-row no-gutters v-resize="onResize">
      <v-col id="list" cols="12" md="3" class="v-card-container" ref="list">
        <v-card class="my-0 mx-0" flat>
          <v-card-header>
            <v-card-title>
              {{ title }}
            </v-card-title>
          </v-card-header>
          <v-container class="ma-0 pa-0">
            <CompostListComponent
              :composts="composts"
              @flyto="flyto"
              @refreshComposts="refreshComposts"
              @setSnackbar="setSnackbar"
              :key="key"
            />
          </v-container>
        </v-card>
      </v-col>
      <v-col cls="12" md="9" class="v-card-container" ref="map">
        <v-card flat>
          <MapComponent
            :composts="composts"
            :isAddCompost="false"
            :v-if="!composts"
            :key="key"
            :compostView="compostView"
            ref="mapComponent"
          />
        </v-card>
      </v-col>
    </v-row>

    <CustomSnackBarComponent
      :snackbar="snackbar"
      @clearSnackbar="snackbar.text = ''"
    />
    <v-btn
      class="ma-3 compost-add-button"
      color="success"
      text
      icon
      size="large"
      @click="addCompost()"
      v-if="authStatus"
    >
      <v-icon large>mdi-map-marker-plus</v-icon>
    </v-btn>

    <v-btn
      class="ma-3 compost-toggle-button"
      color="info"
      text
      icon
      size="large"
      @click="toggleCompostView"
      v-if="isMobile"
    >
      <template v-if="compostView">
        <v-icon v-if="compostView" class="text-white" icon="mdi-map"></v-icon>
      </template>
      <template v-else>
        <v-icon class="text-white"> mdi-format-list-bulleted-square </v-icon>
      </template>
    </v-btn>
  </div>
</template>

<script>
import MapComponent from "../components/MapComponent.vue";
import CompostListComponent from "../components/CompostListComponent.vue";
import CustomSnackBarComponent from "../components/CustomSnackBarComponent.vue";
import { mapActions, mapGetters } from "vuex";
import { useDisplay } from "vuetify";

export default {
  name: "composts-view",
  components: {
    MapComponent,
    CustomSnackBarComponent,
    CompostListComponent,
  },
  props: {
    snackbarText: String,
    snackbarType: String,
  },
  data() {
    return {
      currentTab: "map",
      key: "",
      param: "",
      compostView: false,
      snackbar: {
        text: "",
        type: "info",
      },
      title: "",
      titles: {
        all: "Tout les composts",
        my: "Mes composts",
        fav: "Mes favoris",
      },
    };
  },
  computed: {
    ...mapGetters(["authStatus", "composts"]),
    isMobile: function () {
      const { name } = useDisplay();
      switch (name.value) {
        case "xs":
          return true;
        case "sm":
          return true;
        default:
          return false;
      }
    },
  },
  methods: {
    ...mapActions(["getAllComposts", "getMyComposts", "getFavoritesComposts"]),
    onResize() {
      this.openTab(this.currentTab);
    },
    flyto(location) {
      this.toggleCompostView();
      this.$refs.mapComponent.flytomap(location);
    },
    setSnackbar(snackbar) {
      this.snackbar = snackbar;
    },
    addCompost() {
      this.$router.push({ path: "/add-compost" });
    },
    toggleCompostView() {
      this.compostView ? this.openTab("map") : this.openTab("list");
      this.compostView = !this.compostView;
    },
    openTab(tab) {
      this.currentTab = tab;
      this.$refs.list.$el.style.display = this.isMobile ? "none" : "block";
      this.$refs.map.$el.style.display = this.isMobile ? "none" : "block";
      this.$refs[tab].$el.style.display = "block";
    },
    refreshComposts() {
      this.key = Math.round(Math.random() * 1000);
    },
  },
  watch: {
    "$route.params.filter": {
      handler: function (filter) {
        this.title = this.titles[filter];
        if (filter == "my") {
          this.getMyComposts().then(this.refreshComposts());
        } else if (filter == "fav") {
          this.getFavoritesComposts().then(this.refreshComposts());
        } else {
          this.getAllComposts().then(this.refreshComposts());
        }
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    this.openTab(this.currentTab);
    if (this.snackbarType && this.snackbarText) {
      this.snackbar.text = this.snackbarText;
      this.snackbar.type = this.snackbarType;
    }
  },
};
</script>
