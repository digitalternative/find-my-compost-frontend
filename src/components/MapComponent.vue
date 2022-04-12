<template>
  <div id="map-container">
    <div
      class="leaflet-bottom leaflet-right leaflet-button"
      style="pointer-events: auto"
      v-if="authStatus"
    >
      <v-btn
        id="add-marker"
        class="ma-2"
        text
        icon
        color="green lighten-2"
        @click="addCompost()"
      >
        <v-icon @click="addCompost()" large>mdi-map-marker-plus</v-icon>
      </v-btn>
    </div>
  </div>
</template>
<script>
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import { mapGetters } from "vuex";

import { OpenStreetMapProvider } from "leaflet-geosearch";
import { GeoSearchControl } from "leaflet-geosearch";
import "leaflet-geosearch/assets/css/leaflet.css";

export default {
  name: "map-component",
  data() {
    return {
      map: null,
      marker: null,
      count: 0,
    };
  },
  computed: {
    ...mapGetters(["authStatus"]),
  },
  props: {
    composts: {
      type: Array,
    },
  },
  methods: {
    initMap() {
      this.map = L.map("map-container").setView([50.84673, 4.35247], 8);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);
      const provider = new OpenStreetMapProvider();
      const searchControl = new GeoSearchControl({
        provider,
      });
      if (this.composts) {
        this.addCompostsMarker(this.composts);
      }
      this.map.addControl(searchControl);
    },
    addCompostsMarker(composts) {
      for (const compost of composts) {
        const address = compost.address;
        const coordinates = address.coordinates;
        L.marker(
          L.latLng(parseFloat(coordinates.lat), parseFloat(coordinates.lng))
        ).addTo(this.map);
      }
    },
    reloadMap() {
      if (this.map) {
        setTimeout(() => {
          this.map.invalidateSize();
          this.map.eachLayer((layer) => {
            if (layer instanceof L.Marker) {
              layer.openPopup();
            }
          });
        }, 1500);
      }
    },
    addCompost() {
      this.$router.push({ path: "/add-compost" });
    },
  },
  mounted() {
    this.initMap();
    window.addEventListener("resize", this.reloadMap());
  },
  beforeUnmount() {
    if (this.map) {
      console.log("destroy");

      this.map.remove();
    }
  },
};
</script>
