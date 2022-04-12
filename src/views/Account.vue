<template>
  <div class="v-card-container">
    <v-card class="my-5 mx-5" flat>
      <v-card-header>
        <div>
          <div class="text-h6 mb-1">Compte</div>
          <div class="text-caption">
            Vous pouver modifier le formulaire ci-dessous pour changer vos
            informations.
          </div>
        </div>
      </v-card-header>
      <v-card-text>
        <v-container>
          <UserFormComponent :user="user" />
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import UserFormComponent from "../components/UserFormComponent.vue";
import { mapGetters } from "vuex";
export default {
  name: "account-view",
  components: { UserFormComponent },
  computed: {
    ...mapGetters(["user"]),
  },
};
</script>
