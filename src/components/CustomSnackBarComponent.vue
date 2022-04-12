<template>
  <div id="snackbar">
    <v-card-text
      class="text-white pa-1"
      v-show="!!snackbar.text"
      v-html="snackbar.text"
    ></v-card-text>
  </div>
</template>

<script>
export default {
  name: "custom-snack-bar-component",
  props: {
    snackbar: {
      type: Object,
    },
  },
  emits: ["clearSnackbar"],
  methods: {
    timeout(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    async showSnackBar() {
      // Get the snackbar DIV
      var x = document.getElementById("snackbar");

      // Add the "show" class to DIV
      x.className = "show box-shadow bg-" + this.snackbar.type;

      // After 3 seconds, remove the show class from DIV
      await this.timeout(3000);
      this.$emit("clearSnackbar");
      x.className = x.className.replace("show", "");
    },
  },
  watch: {
    snackbar: {
      handler(val) {
        if (val.text !== "") this.showSnackBar();
      },
      deep: true,
    },
  },
};
</script>
<style>
#snackbar {
  visibility: hidden; /* Hidden by default. Visible on click */
  width: 240px; /* Set a default minimum width */
  margin-left: -120px; /* Divide value of min-width by 2 */
  text-align: center; /* Centered text */
  border-radius: 8px; /* Rounded borders */
  padding: 10px; /* Padding */
  position: fixed; /* Sit on top of the screen */
  z-index: 1; /* Add a z-index if needed */
  left: 50%; /* Center the snackbar */
  bottom: 84px; /*56px from the bottom */
}

/* Show the snackbar when clicking on a button (class added with JavaScript) */
#snackbar.show {
  visibility: visible; /* Show the snackbar */
  /* Add animation: Take 0.5 seconds to fade in and out the snackbar.
  However, delay the fade out process for 2.5 seconds */
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

/* Animations to fade the snackbar in and out */
@-webkit-keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: 30px;
    opacity: 1;
  }
}

@keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: 30px;
    opacity: 1;
  }
}

@-webkit-keyframes fadeout {
  from {
    bottom: 30px;
    opacity: 1;
  }
  to {
    bottom: 0;
    opacity: 0;
  }
}

@keyframes fadeout {
  from {
    bottom: 30px;
    opacity: 1;
  }
  to {
    bottom: 0;
    opacity: 0;
  }
}
</style>
