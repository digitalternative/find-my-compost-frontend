<template>
  <v-card
    class="pa-2 square-corner"
    :color="compostTypeColor(compost.type)"
    flat
  >
    <h4>Contact</h4>
    <v-list :color="compostTypeColor(compost.type)" density="compact">
      <v-list-item
        class="pl-0 text-white"
        v-for="([title, icon, href], i) in contact(compost)"
        :key="i"
        :prepend-icon="icon"
        :href="href == '#' ? '' : href + title"
        target="_blank"
        >{{ title }}</v-list-item
      >
    </v-list>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "contact-component",
  props: {
    compost: {
      type: Object,
    },
  },
  computed: { ...mapGetters(["compostTypeColor"]) },
  methods: {
    contact(compost) {
      let contact = [];
      compost.manager
        ? contact.push([compost.manager, "mdi-account-circle", "#"])
        : null;
      compost.email
        ? contact.push([compost.email, "mdi-email-outline", "mailto:"])
        : null;
      compost.phone
        ? contact.push([compost.phone, "mdi-phone-outline", "tel:"])
        : null;
      compost.website ? contact.push([compost.website, "mdi-web", "//"]) : null;
      return contact;
    },
  },
};
</script>
