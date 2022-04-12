<template>
  <div class="v-card-container">
    <v-card class="my-5 mx-5" flat>
      <v-card-header>
        <div>
          <div class="text-h6 mb-1">S'enregistrer</div>
          <div class="text-caption">
            Veuillez remplir le formulaire ci-dessous afin de vous enregistrer.
          </div>
        </div>
      </v-card-header>
      <v-card-text>
        <v-container>
          <UserFormComponent />
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import UserFormComponent from "../components/UserFormComponent.vue";

export default {
  name: "registration-vue",
  components: {
    UserFormComponent,
  },
};
</script>
