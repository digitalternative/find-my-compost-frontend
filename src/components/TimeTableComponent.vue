<template>
  <v-card-header>
    <v-card-header-text>
      <v-card-title>Horaire</v-card-title>
    </v-card-header-text>
  </v-card-header>
  <v-card-text>
    <v-select
      variant="outlined"
      density="compact"
      v-model="day"
      :items="days"
      label="Jour"
      @update:modelValue="addTimetable"
      :rules="dayRules"
      ref="day"
    ></v-select>
    <v-sheet
      class="mx-auto pa-1 rounded-lg"
      elevation="2"
      height="100%"
      width="100%"
      v-if="timetableInput.length > 0"
    >
      <v-row
        no-gutters
        v-for="item in timetableInput"
        :key="item.day"
        align="center"
        justify="center"
        class="ma-2"
      >
        <v-col cols="12">
          <v-btn
            variant="outlined"
            color="error"
            icon
            size="x-small"
            @click="deleteItem(item)"
            class="mr-2"
          >
            <v-icon>mdi-delete</v-icon>
          </v-btn>
          <b>{{ days[item.day - 1] }}</b>
        </v-col>
        <v-col>
          Début
          <Datepicker v-model="item.start" timePicker class="time-picker" />
        </v-col>
        <v-col>
          Fin
          <Datepicker v-model="item.end" timePicker class="time-picker" />
        </v-col>
      </v-row>
    </v-sheet>
  </v-card-text>
</template>
<script>
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { mapGetters } from "vuex";
export default {
  name: "time-table-component",
  components: { Datepicker },
  data() {
    return {
      headers: [
        { text: "Jour", value: "day" },
        { text: "Début", value: "start" },
        { text: "Fin", value: "end" },
      ],

      day: "",
      timetableInput: [],
      dayRules: [
        () =>
          this.checkTimetable() ||
          "L'heure de fin doit être supérieure à l'heure de début.",
      ],
    };
  },
  props: {
    timetable: {
      type: Array,
    },
  },
  emits: ["updateTimeTableDatas"],
  computed: {
    ...mapGetters(["days"]),
  },
  methods: {
    addTimetable(day) {
      const dayExist = this.timetableInput.some((element) => {
        if (element.day - 1 === day) {
          return true;
        }
      });
      if (!dayExist && day) {
        const index = this.days.indexOf(day);
        this.timetableInput.push({
          day: index + 1,
          start: { hours: 0, minutes: 0 },
          end: { hours: 0, minutes: 0 },
        });
        this.timetableInput.sort(function (a, b) {
          return a.day - b.day;
        });
        this.$emit("updateTimeTableDatas", this.timetableInput);
      }
      this.$refs.day.value = "";
    },
    deleteItem(item) {
      this.timetableInput.splice(this.timetableInput.indexOf(item), 1);
      this.$emit("updateTimeTableDatas", this.timetableInput);
    },
    checkTimetable() {
      let valid = true;
      this.timetableInput.forEach((item) => {
        if (item.start === null || item.end === null) {
          valid = false;
        } else {
          const start = item.start.hours + item.start.minutes;
          const end = item.end.hours + item.end.minutes;
          if (start > end) {
            valid = false;
          }
        }
      });
      return valid;
    },
  },
  watch: {
    timetable() {
      this.timetableInput = this.$props.timetable;
    },
  },
};
</script>
