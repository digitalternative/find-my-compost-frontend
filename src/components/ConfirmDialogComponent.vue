<template>
  <v-dialog v-model="dialog">
    <v-card flat>
      <v-toolbar dark :color="options.color" dense flat>
        <v-toolbar-title>
          {{ title }}
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text
        class="pa-3"
        v-show="!!message"
        v-html="message"
      ></v-card-text>
      <v-alert
        v-if="options.warning"
        variant="outlined"
        type="warning"
        class="ma-1"
      >
        {{ options.warning }}
      </v-alert>
      <v-card-actions class="pt-3">
        <v-spacer></v-spacer>
        <v-btn
          v-if="!options.noconfirm"
          color="secondary"
          text
          class="body-2 font-weight-bold"
          @click="cancel"
          >Annuler</v-btn
        >
        <v-btn
          :color="options.color"
          class="body-2 font-weight-bold"
          outlined
          @click="agree"
          >{{ options.btn }}</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "confirm-dialog-component",
  data() {
    return {
      dialog: false,
      resolve: null,
      reject: null,
      message: null,
      title: null,
      options: {
        width: 400,
        zIndex: 200,
        noconfirm: false,
        btn: "Ok",
      },
    };
  },

  methods: {
    open(title, message, options) {
      this.dialog = true;
      this.title = title;
      this.message = message;
      this.options = Object.assign(this.options, options);
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    agree() {
      this.resolve(true);
      this.dialog = false;
    },
    cancel() {
      this.resolve(false);
      this.dialog = false;
    },
  },
};
</script>
