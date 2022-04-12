<template>
  <div id="addcompost-container">
    <v-card class="mx-auto my-5" max-width="344">
      <v-card-header>
        <div>
          <div class="text-h6 mb-1">Créer un compost</div>
          <div class="text-caption">
            Veuillez remplir le formulaire ci-dessous pour créer un compost.
          </div>
        </div>
      </v-card-header>
      <v-card-text>
        <v-container>
          <AddressComponent @addAddressInput="addInputAddress($event)" />
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import AddressComponent from "../components/AddressComponent.vue";

import {
  EmailField,
  TextField,
  SelectField,
  email,
  Validator,
  required,
  CustomField,
  UrlField,
  url,
} from "@asigloo/vue-dynamic-forms";
import { useStore } from "vuex";

export default defineComponent({
  name: "add-compost-view",
  components: {
    AddressComponent,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    let address = {};
    let error = reactive({
      msg: "",
    });
    const form = ref({
      id: "add-compost-form",
      fields: {
        title: TextField({
          label: "Titre",
          value: "Composte de chastre",
          placeholder: "Titre du compost",
          validations: [
            Validator({ validator: required, text: "Ce champ est requis" }),
          ],
        }),
        type: SelectField({
          label: "Type",
          value: "public",
          options: [
            "Values",
            {
              value: "private",
              label: "Privé",
              selected: true,
            },
            {
              value: "public",
              label: "Public",
            },
          ],
          validations: [
            Validator({ validator: required, text: "Ce champ est requis" }),
          ],
        }),
        email: EmailField({
          label: "Email",
          value: "chastre@composte.be",
          placeholder: "Email de contact",
          validations: [
            Validator({
              validator: email,
              text: "Email format is incorrect",
            }),
          ],
        }),
        phone: TextField({
          label: "Téléphone",
          value: "010 99 99 99",
          placeholder: "Téléphone de contact",
        }),
        website: UrlField({
          label: "Site web",
          value: "www.digitalternative.be",
          placeholder: "Site web du compost",
          validations: [
            Validator({
              validator: url,
              text: "Format of url is incorrect",
            }),
          ],
        }),
        address: CustomField({
          label: "Ajouter une adresse",
          value: "\uf055",
        }),
      },
      options: {
        resetAfterSubmit: false,
      },
    });

    function submitForm(addressInput: null) {
      error.msg = "";
      if (Object.keys(address).length) {
        Object.assign(addressInput, address, { user: store.state.user._id });
        store
          .dispatch("addCompost", addressInput)
          .then(
            router.push({
              name: "myComposts",
              query: { reload: "true" },
            })
          )
          .catch();
      } else {
        error.msg = "Vous devez ajouter une adresse pour ajouter un compost.";
      }
    }

    function addInputAddress(addressInput: any) {
      form.value.fields.address.value = addressInput.addressDisplay;
      address = addressInput.data;
    }

    return {
      form,
      address,
      error,
      submitForm,
      addInputAddress,
    };
  },
});
</script>
<style lang="scss">
@import "@asigloo/vue-dynamic-forms/dist/themes/default.scss";
@import "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css";
</style>
