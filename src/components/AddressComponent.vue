<template>
  <v-text-field
    v-model="address"
    :rules="addressRules"
    label="Ajouter une adresse"
    append-inner-icon="mdi-map-marker-plus"
    required
    variant="outlined"
    density="compact"
    readonly
    @click="addressDialog = true"
  ></v-text-field>
  <v-row justify="center">
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
          <v-btn dark text @click="addAddress"> Ajouter </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card flat>
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
        <p class="p-2 bd-highlight">
          Cliquer sur la carte pour ajouter une adresse.
        </p>
        <div class="p-2 bd-highlight">
          <MapComponent :isAddCompost="true" @clickOnMap="getAddress" />
        </div>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import MapComponent from "../components/MapComponent.vue";

export default {
  name: "address-component",
  components: {
    MapComponent,
  },
  data() {
    return {
      addressDialog: false,
      street: "",
      zipcode: "",
      city: "",
      addressRules: [(v) => !!v || "L'adresse est requis"],
    };
  },
  emits: ["updateAddressDatas"],
  props: {
    addressDatas: {
      type: Object,
    },
    address: {
      type: String,
    },
  },
  methods: {
    getAddress(lngLat) {
      var data = {
        format: "jsonv2",
        lat: lngLat.lat,
        lon: lngLat.lng,
      };

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
          this.addressinput = {
            addressDisplay: response.display_name,
            data: {
              street: this.street,
              zipcode: this.zipcode,
              city: this.city,
              lat: parseFloat(lngLat.lat),
              lng: parseFloat(lngLat.lng),
            },
          };
        });
    },
    addAddress() {
      this.$emit("updateAddressDatas", this.addressinput);
      this.addressDialog = false;
    },
  },
};
</script>
