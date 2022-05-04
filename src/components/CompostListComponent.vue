<template>
  <v-expansion-panels class="mb-10">
    <template v-if="composts.length > 0">
      <v-expansion-panel
        v-for="compost in composts"
        :key="compost.title"
        min-width="289px"
      >
        <v-expansion-panel-title>
          {{ compost.title }}
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-card flat :color="compostTypeColor(compost.type)">
            <v-img
              class="text-white"
              max-height="100%"
              max-width="100%"
              min-width="240px"
              :src="compost.photo.file ? compost.photo.file : defaultImage"
              contain
              gradient="to top right, rgba(0,0,0,.4), rgba(0,0,0,.4)"
            >
              <v-card-title>
                <h3>{{ compost.title }}</h3>

                <v-spacer></v-spacer>

                <v-btn
                  v-if="authStatus"
                  :color="compostFavoriteColor(compost._id)"
                  icon="mdi-heart"
                  @click="
                    updateFavorite({ _id: compost._id, filter: filter }).then(
                      (toRemove) => {
                        if (toRemove && filter == 'fav')
                          this.$emit('refreshComposts');
                      }
                    )
                  "
                  flat
                  variant="text"
                ></v-btn>
              </v-card-title>

              <v-card-subtitle
                class="text-high-emphasis text-overline font-weight-bold"
              >
                <v-btn size="x-small" :color="compostTypeColor(compost.type)">{{
                  compostTypeName(compost.type)
                }}</v-btn>
              </v-card-subtitle>
              <v-card-text class="text-white">
                <div class="d-flex" align="center" justify="center">
                  <div float-right class="mr-2">
                    <v-btn
                      size="x-small"
                      icon="mdi-crosshairs"
                      variant="outlined"
                      @click="flyToCompost(compost.address.coordinates)"
                    >
                    </v-btn>
                  </div>
                  <div>
                    {{ compost.address.street }}<br />
                    {{ compost.address.zipcode }},
                    {{ compost.address.city }}
                  </div>
                </div>
              </v-card-text>
            </v-img>
            <v-row>
              <v-col>
                <ContactComponent :compost="compost" />
                <v-card-actions v-if="filter === 'my'">
                  <v-spacer></v-spacer>
                  <v-btn
                    size="small"
                    color="info"
                    icon
                    @click="edit(compost._id)"
                  >
                    <v-icon icon="mdi-pencil" class="text-white" text></v-icon>
                  </v-btn>
                  <v-btn
                    size="small"
                    color="error"
                    icon
                    @click="remove(compost._id, compost.title)"
                  >
                    <v-icon icon="mdi-delete" class="text-white" text></v-icon>
                  </v-btn>
                </v-card-actions>
                <p align="center" style="font-size: small">
                  Créer par
                  <span style="font-weight: bold">{{
                    compost.user.username
                  }}</span>
                </p>
              </v-col>
            </v-row>
          </v-card>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </template>
    <template v-else> Aucun compost </template>
  </v-expansion-panels>

  <ConfirmDialogComponent ref="confirm" />
</template>

<script>
import ConfirmDialogComponent from "./ConfirmDialogComponent.vue";
import { mapGetters, mapActions } from "vuex";
import ContactComponent from "./ContactComponent.vue";
import defaultImage from "@/assets/default.jpg";
export default {
  name: "compost-list-component",
  components: {
    ConfirmDialogComponent,
    ContactComponent,
  },
  data() {
    return {
      filter: "",
      defaultImage: defaultImage,
    };
  },
  props: {
    composts: {
      type: Array,
    },
  },
  emits: ["flyto", "refreshComposts", "setSnackbar"],
  computed: {
    ...mapGetters([
      "authStatus",
      "compostTypeName",
      "compostFavoriteColor",
      "compostTypeColor",
    ]),
  },
  methods: {
    ...mapActions(["removeCompost", "updateFavorite", "getFavoritesComposts"]),
    flyToCompost(location) {
      this.$emit("flyto", location);
    },
    edit(id) {
      this.$router.push({ name: "UpdateCompost", params: { id: id } });
    },
    async remove(id, title) {
      if (
        await this.$refs.confirm.open(
          "Suppression du compost",
          "Êtes vous sûre de vouloir supprimer le compost <b>COMPOST</b> ?".replace(
            "COMPOST",
            title
          ),
          {
            color: "error",
            btn: "Supprimer",
          }
        )
      ) {
        this.removeCompost(id);
        this.$emit("refreshComposts");
        this.$emit("setSnackbar", {
          text: "<b>" + title + "</b> supprimé !",
          type: "error",
        });
      }
    },
  },
  watch: {
    "$route.params.filter": {
      handler: function (filter) {
        this.filter = filter;
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>
