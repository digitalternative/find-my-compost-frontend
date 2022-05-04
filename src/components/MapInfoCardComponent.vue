<template>
  <v-card class="mx-auto my-12" max-width="374">
    <v-card-title>
      <h3>{{ infoData.title }}</h3>

      <v-spacer></v-spacer>

      <v-btn
        v-if="authStatus"
        :color="compostFavoriteColor(infoData._id)"
        icon="mdi-heart"
        :id="'favoriteBtn' + infoData._id"
        flat
        variant="text"
      ></v-btn>
    </v-card-title>
    <v-card-subtitle class="text-high-emphasis text-overline font-weight-bold">
      <v-btn size="x-small" :color="compostTypeColor(infoData.type)">{{
        compostTypeName(infoData.type)
      }}</v-btn>
    </v-card-subtitle>
    <v-card-text>
      <v-row align="center" class="mx-0">
        <div>
          {{ infoData.address.street }}<br />
          {{ infoData.address.zipcode }},
          {{ infoData.address.city }}
        </div>
      </v-row>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn :id="'itinaryBtn' + infoData._id" color="info"> Itinéraire </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "map-info-card-component",

  props: {
    infoData: {
      type: Object,
    },
  },
  computed: {
    ...mapGetters([
      "authStatus",
      "compostTypeName",
      "compostTypeColor",
      "compostFavoriteColor",
    ]),
  },
};
</script>
