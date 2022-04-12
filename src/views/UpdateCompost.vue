<template>
  <div class="v-card-container">
    <v-card class="my-5 mx-5" flat>
      <v-card-header>
        <div>
          <div class="text-h6 mb-1">Editer le compost</div>
          <div class="text-caption">
            Veuillez modifier les champs ci-dessous.
          </div>
        </div>
      </v-card-header>

      <CompostFormComponent :compost="compost" />
    </v-card>
  </div>
</template>

<script>
import CompostFormComponent from "../components/CompostFormComponent.vue";
import { mapGetters } from "vuex";
export default {
  name: "update-compost-view",
  components: {
    CompostFormComponent,
  },
  computed: {
    ...mapGetters(["compostById"]),
    compost() {
      return this.compostById({ _id: this.$route.params.id });
    },
  },
};
</script>
