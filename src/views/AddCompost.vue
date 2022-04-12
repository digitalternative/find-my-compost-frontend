<template>
  <div class="v-card-container">
    <v-card class="my-5 mx-5" flat>
      <v-card-header>
        <div>
          <div class="text-h6 mb-1">Ajouter un compost</div>
          <div class="text-caption">
            Veuillez remplir le formulaire ci-dessous pour créer un compost.
          </div>
        </div>
      </v-card-header>
      <v-card-text>
        <v-container>
          <CompostFormComponent :compost="compost" />
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import CompostFormComponent from "../components/CompostFormComponent.vue";
export default {
  name: "add-compost-view",
  components: {
    CompostFormComponent,
  },
  data: () => ({
    compost: null,
  }),
};
</script>
