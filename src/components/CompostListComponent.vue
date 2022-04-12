<template>
  <div class="menu-container">
    <v-list :v-if="compostsList">
      <v-list-item
        v-for="compost in compostsList"
        :key="compost.title"
        :title="compost.title"
        :subtitle="compost.subtitle"
      >
        <template v-slot:append>
          <v-list-item-avatar right>
            <v-btn
              variant="text"
              :color="compost.color"
              :icon="compost.icon"
            ></v-btn>
          </v-list-item-avatar>
        </template>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "compost-list-component",
  data() {
    return {
      items: [
        {
          text: "Tout les composts",
          path: "/composts/all",
        },
        {
          text: "Mes composts",
          path: "/composts/my",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["compostsList"]),
  },
  props: {
    compost: {
      type: Object,
    },
  },
};
</script>
