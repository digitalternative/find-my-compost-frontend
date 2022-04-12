<template>
  <v-row justify="center">
    <v-btn color="primary" @click="addressDialog = true"> Open Dialog </v-btn>
    <v-dialog
      v-model="addressDialog"
      fullscreen
      transition="dialog-bottom-transition"
    >
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="addressDialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Adresse</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="addressDialog = false"> Ajouter </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card>
        <div class="modal-body">
          <div class="form-group">
            <input
              v-model="street"
              type="text"
              class="form-control mt-1"
              placeholder="Rue"
              disabled
            />
            <input
              v-model="zipcode"
              type="text"
              class="form-control mt-1"
              placeholder="Code postal"
              disabled
            />
            <input
              v-model="city"
              type="text"
              class="form-control mt-1"
              placeholder="Ville"
              disabled
            />
          </div>
        </div>
        <div class="p-2 bd-highlight">
          Cliquer sur la carte ou rechercher une adresse.
        </div>
        <div class="p-2 bd-highlight">
          <div id="mapaddress-container" ref="mapComponent"></div>
        </div>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { OpenStreetMapProvider } from "leaflet-geosearch";
import { GeoSearchControl } from "leaflet-geosearch";
import "leaflet-geosearch/assets/css/leaflet.css";

export default {
  name: "address-component",
  data() {
    return {
      addressDialog: false,
      map: null,
      marker: null,
      address: {},
      street: "",
      zipcode: "",
      city: "",
    };
  },
  methods: {
    initMap() {
      this.map = L.map("mapaddress-container").setView([50.84673, 4.35247], 8);
      this.map.on("click", (e) => {
        this.onClickHandler(e);
      });
      L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);
      const provider = new OpenStreetMapProvider();
      const searchControl = new GeoSearchControl({
        provider,
      });

      this.map.addControl(searchControl);
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
    onClickHandler(e) {
      const latlng = Object.values(e.latlng);
      var data = {
        format: "jsonv2",
        lat: latlng[0],
        lon: latlng[1],
      };
      if (this.marker) this.map.removeLayer(this.marker);
      this.marker = L.marker([latlng[0], latlng[1]]).addTo(this.map);
      var url = new URL("https://nominatim.openstreetmap.org/reverse");
      for (let k in data) {
        url.searchParams.append(k, data[k]);
      }
      fetch(url)
        .then((response) => response.json())
        .then((response) => {
          const address = response.address;
          if (address.house_number) {
            this.street = address.house_number + " " + address.road;
          } else {
            this.street = address.road;
          }
          this.zipcode = parseInt(address.postcode);

          const cityTypes = [
            address.city,
            address.town,
            address.village,
            address.municipality,
          ];
          for (const city of cityTypes) {
            if (city) {
              this.city = city;
              break;
            }
          }
          this.address = {
            addressDisplay: response.display_name,
            data: {
              street: this.street,
              zipcode: this.zipcode,
              city: this.city,
              lat: latlng[0],
              lng: latlng[1],
            },
          };
        });
    },
    close() {
      this.$emit("close");
    },
    addAddress() {
      this.$emit("addAddressInput", this.address);
    },
  },
  async mounted() {
    console.log("mounted");
    await new Promise((resolve) => {
      const stop = this.$watch("addressDialog", () => resolve(stop()));
    });
    console.log("initmap");
    this.initMap();
    window.addEventListener("resize", this.reloadMap());
    this.$nextTick(() => {
      this.reloadMap();
    });
  },
  beforeUnmount() {
    if (this.map) {
      console.log("destroy");

      this.map.remove();
    }
  },
  watch: {
    addressDialog: function (newDialog, oldDialog) {
      if (newDialog && this.map) {
        console.log("reload");
        this.reloadMap();
      }
    },
  },
};
</script>
