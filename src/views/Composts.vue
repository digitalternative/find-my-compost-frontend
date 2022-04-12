<template>
  <div class="composts-container">
    <MapComponent :composts="composts" :v-if="!composts" :key="key" />
  </div>
</template>

<script>
import MapComponent from "../components/MapComponent.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "composts-view",
  components: {
    MapComponent,
  },
  data() {
    return {
      key: "",
      param: "",
      composts: [],
    };
  },
  methods: {
    ...mapActions(["getComposts", "getMyComposts"]),
    setComposts(param) {
      if (param == "my") {
        this.getMyComposts().then((composts) => {
          this.composts = composts;
          this.ready = true;
        });
      } else {
        this.getComposts().then((composts) => {
          this.composts = composts;
          this.ready = true;
        });
      }
    },
  },
  watch: {
    "$route.params.filter": {
      handler: function (filter) {
        if (filter == "my") {
          this.getMyComposts().then((composts) => {
            this.composts = composts;
            this.key = Math.round(Math.random() * 1000);
          });
        } else {
          this.getComposts().then((composts) => {
            this.composts = composts;
            this.key = Math.round(Math.random() * 1000);
          });
        }
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>
