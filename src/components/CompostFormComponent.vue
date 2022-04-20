<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-card flat>
      <v-card-header>
        <v-card-header-text>
          <v-card-subtitle>Informations</v-card-subtitle>
        </v-card-header-text>
      </v-card-header>

      <v-card-text>
        <v-text-field
          variant="outlined"
          density="compact"
          v-model="title"
          :counter="20"
          :rules="titleRules"
          label="Titre"
          required
        ></v-text-field>
        <v-text-field
          variant="outlined"
          density="compact"
          v-model="manager"
          :counter="20"
          :rules="managerRules"
          label="Nom du gestionnaire"
          transition="false"
          required
        ></v-text-field>
        <AddressComponent
          @updateAddressDatas="setAddressDatas"
          :address="address"
        />
        <CompostImageComponent></CompostImageComponent>
      </v-card-text>
      <v-card-header>
        <v-card-header-text>
          <v-card-subtitle>Contact</v-card-subtitle>
        </v-card-header-text>
      </v-card-header>

      <v-card-text>
        <v-text-field
          variant="outlined"
          density="compact"
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>
        <v-text-field
          variant="outlined"
          density="compact"
          v-model="phone"
          :counter="10"
          :rules="phoneRules"
          label="Téléphone"
        ></v-text-field>
        <v-text-field
          variant="outlined"
          density="compact"
          v-model="website"
          :counter="10"
          :rules="websiteRules"
          label="Site web"
        ></v-text-field>
      </v-card-text>
    </v-card>
    <v-card-actions class="pr-0">
      <v-spacer></v-spacer>
      <v-btn
        size="large"
        color="success"
        @click="submitUpdateCompost"
        v-if="compost"
      >
        Modifier
      </v-btn>
      <v-btn size="large" color="success" @click="submitAddCompost" v-else>
        Ajouter
      </v-btn>
    </v-card-actions>
  </v-form>
</template>

<script>
import AddressComponent from "../components/AddressComponent.vue";
import CompostImageComponent from "../components/CompostImageComponent.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "compost-form-component",
  components: {
    AddressComponent,
    CompostImageComponent,
  },
  props: {
    compost: {
      type: Object,
    },
  },
  data: () => ({
    valid: false,
    title: "",
    titleRules: [
      (v) => !!v || "Le titre est requis",
      (v) =>
        (v && v.length <= 20) || "Le titre doit faire moins de 20 caracteres",
    ],
    manager: "",
    managerRules: [
      (v) => !!v || "Le nom du gestionnaire est requis",
      (v) =>
        (v && v.length <= 20) || "Le titre doit faire moins de 20 caracteres",
    ],
    type: "",
    types: ["Privé", "Publique"],
    typesRules: [(v) => !!v || "Le type est requis"],
    email: "",
    emailRules: [
      (v) =>
        !v ||
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        "E-mail doit être correcte",
    ],
    phone: "",
    phoneRules: [],
    website: "",
    websiteRules: [
      (v) =>
        !v ||
        /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/.test(
          v
        ) ||
        "Le site web doit être correct",
    ],
    addressDatas: {},
    address: "",
  }),
  computed: {
    ...mapGetters(["compostType", "compostTypeName"]),
  },
  methods: {
    ...mapActions(["addCompost", "updateCompost"]),
    clearMessages() {
      this.message.text = [];
    },
    setAddressDatas(addressDatas) {
      this.address = addressDatas.addressDisplay;
      this.addressDatas = addressDatas.data;
    },
    async submitUpdateCompost() {
      const isValid = await this.$refs.form.validate();
      if (isValid.valid) {
        this.updateCompost({
          _id: this.compost._id,
          title: this.title,
          type: this.compostType(this.type),
          manager: this.manager,
          email: this.email,
          phone: this.phone,
          website: this.website,
          ...this.addressDatas,
          ...this.addressDatas.coordinates,
        }).then(() => {
          const route = {
            name: "Compost",
            params: {
              filter: "my",
              snackbarText: "<b>" + this.title + "</b> mis à jour !",
              snackbarType: "success",
            },
          };
          this.$router.push(route);
        });
      }
    },
    async submitAddCompost() {
      const isValid = await this.$refs.form.validate();
      if (isValid.valid) {
        this.addCompost({
          title: this.title,
          type: this.compostType(this.type),
          manager: this.manager,
          email: this.email,
          phone: this.phone,
          website: this.website,
          user: this.$store.state.user._id,
          ...this.addressDatas,
        }).then(() => {
          const route = {
            name: "Compost",
            params: {
              filter: "my",
              snackbarText: "<strong>" + this.title + "</strong> créé !",
              snackbarType: "success",
            },
          };
          this.$router.push(route);
        });
      }
    },
  },
  mounted() {
    if (this.compost) {
      this.title = this.compost.title;
      this.manager = this.compost.manager;
      this.type = this.compostTypeName(this.compost.type);
      this.email = this.compost.email;
      this.phone = this.compost.phone;
      this.website = this.compost.website;
      this.addressDatas = this.compost.address;
      this.address = this.compost.address.street;
    } else if (this.$store.state.user.email) {
      this.email = this.$store.state.user.email;
    }
  },
};
</script>
