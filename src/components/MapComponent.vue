<template>
  <div>
    <div id="map-container" ref="map-container"></div>
    <template v-for="compost in composts" :key="compost._id">
      <MapInfoCardComponent
        v-show="true"
        :infoData="compost"
        :ref="'mapInfoCard' + compost._id"
      >
      </MapInfoCardComponent>
      <BottomSheetComponent :ref="'bottomSheet' + compost._id">
        <v-list>
          <v-list-item
            v-for="itinary in itinaryApps(compost.address.coordinates)"
            :key="itinary.title"
            @click="sheet = false"
            :href="itinary.href"
          >
            <v-list-item-avatar>
              <v-icon :icon="itinary.icon"></v-icon>
            </v-list-item-avatar>
            <v-list-item-title>{{ itinary.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </BottomSheetComponent>
    </template>
  </div>
</template>
<script>
import mapboxgl from "mapbox-gl";
import AnimatedPopup from "mapbox-gl-animated-popup";
import "mapbox-gl/dist/mapbox-gl.css";
import { mapActions, mapGetters } from "vuex";
import MapInfoCardComponent from "./MapInfoCardComponent.vue";
import BottomSheetComponent from "./BottomSheetComponent.vue";

export default {
  name: "map-component",
  components: { MapInfoCardComponent, BottomSheetComponent },
  data() {
    return {
      selectedMarker: null,
      map: null,
      infoDatas: [],
    };
  },
  emits: ["clickOnMap"],
  computed: {
    ...mapGetters(["compostGeojson", "user"]),
  },
  props: {
    composts: {
      type: Array,
    },
    isAddCompost: {
      type: Boolean,
    },
    compostView: {
      type: Boolean,
    },
  },
  methods: {
    ...mapActions(["updateUser"]),
    flytomap(location) {
      this.map.flyTo({
        center: [parseFloat(location.lng), parseFloat(location.lat)],
        zoom: 11,
        essential: true,
      });
    },
    itinaryApps(coordinates) {
      const destination = coordinates.lat + "," + coordinates.lng;
      return [
        {
          icon: "mdi-navigation",
          title: "Itinéraire avec Google Map",
          href:
            "https://www.google.com/maps/search/?api=1&query=" + destination,
        },
        {
          icon: "mdi-navigation",
          title: "Itinéraire avec Waze Map",
          href: "https://waze.com/ul?ll=" + destination + "&navigate=yes&z=10",
        },
      ];
    },
    openBottomSheet(id) {
      this.$refs["bottomSheet" + id][0].open();
    },
    initMap() {
      mapboxgl.accessToken =
        "pk.eyJ1IjoiZnJhbmtzcGl0eiIsImEiOiJjbDBxem54czQwNm8yM2ZwcXp1Y3JuYWZjIn0.vrQ7J9HEZbCssKpW6v1yBQ";
      this.map = new mapboxgl.Map({
        container: "map-container",
        style: "mapbox://styles/mapbox/streets-v11",
        center: [4.368, 50.498296],
        zoom: 6,
        attributionControl: false,
      });
      this.map.on("load", () => {
        if (!this.isAddCompost) {
          for (const compost of this.composts) {
            const mapInfoCard = this.$refs["mapInfoCard" + compost._id][0].$el;
            const itinaryBtn = "itinaryBtn" + compost._id;
            const el = document.createElement("div");
            el.className = "marker-" + compost.type;
            const popup = new AnimatedPopup({
              offset: 25,
              openingAnimation: {
                duration: 1000,
                easing: "easeOutElastic",
              },
              closingAnimation: {
                duration: 300,
                easing: "easeInBack",
              },
            }).setHTML(
              mapInfoCard.innerHTML
              // `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
            );
            mapInfoCard.remove();
            new mapboxgl.Marker(el)
              .setLngLat(compost.address.coordinates)
              .setPopup(popup)
              .addTo(this.map);
            popup.on("open", () => {
              document
                .getElementById(itinaryBtn)
                .setAttribute(
                  "onclick",
                  "openBottomSheet('" + compost._id + "')"
                );
            });
          }
        }
        this.map.addControl(new mapboxgl.NavigationControl(), "top-right");
        this.map.addControl(
          new mapboxgl.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true,
            },
            trackUserLocation: true,
            showUserHeading: true,
          })
        );
        if (this.isAddCompost) {
          this.map.on("click", (e) => {
            if (this.selectedMarker) {
              this.selectedMarker.remove();
            }
            this.selectedMarker = new mapboxgl.Marker()
              .setLngLat(e.lngLat)
              .addTo(this.map);
            this.$emit("clickOnMap", e.lngLat);
          });
        }
      });
    },
    addCompost() {
      this.$router.push({ path: "/add-compost" });
    },
  },
  created() {
    window.openBottomSheet = this.openBottomSheet;
    window.updateFavorite = this.updateFavorite;
  },
  mounted() {
    this.$nextTick(() => {
      this.initMap();
    });
  },
  unmounted() {
    this.map.remove();
  },
  watch: {
    compostView: {
      handler: function (compostView) {
        if (!compostView) {
          this.map.resize();
        }
      },
    },
  },
};
</script>
