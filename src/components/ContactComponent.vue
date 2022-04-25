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
      <v-list-group>
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            class="pl-0 text-white"
            prepend-icon="mdi-timetable"
            two-line
          >
            <span style="white-space: nowrap"> Horaires&ensp;</span>
            <span v-if="isOpen(compost.timetable)">
              <span class="text-overline text-green">Ouvert</span>
              ⋅&ensp;Ferme à {{ isOpen(compost.timetable) }}</span
            >
            <span v-else class="text-overline text-red"> Fermé </span>
          </v-list-item>
        </template>
        <v-list-item
          class="pl-0 text-white"
          v-for="item in compost.timetable"
          :key="item.day"
        >
          {{ days[item.day - 1] }}
          {{ getTimeToString(item.start) }} -
          {{ getTimeToString(item.end) }}
        </v-list-item>
      </v-list-group>
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
  computed: {
    ...mapGetters(["compostTypeColor", "days"]),
  },
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
    getTimeToString(time) {
      return (
        time.hours.toString().padStart(2, "0") +
        ":" +
        time.minutes.toString().padStart(2, "0")
      );
    },
    isOpen(timetable) {
      let isOpen = "";

      timetable.forEach((item) => {
        const start = item.start.hours * 60 + item.start.minutes;
        const end = item.end.hours * 60 + item.end.minutes;
        const now = new Date();
        const day = now.getDay();
        const current = now.getHours() * 60 + now.getMinutes();
        if (current > start && current < end && day == item.day) {
          isOpen = this.getTimeToString(item.end);
        }
      });
      return isOpen;
    },
  },
};
</script>
