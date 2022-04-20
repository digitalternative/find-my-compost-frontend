<template>
  <v-file-input
    v-model="image"
    variant="outlined"
    :rules="imageRules"
    accept="image/*"
    placeholder="Choisir une photo."
    append-inner-icon="mdi-camera"
    prepend-icon=""
    label="Photo"
    density="compact"
    clearable
    @change="openCropDialog"
    @click:clear="reset"
  ></v-file-input>
  <v-img v-if="croppedImageUrl" :src="croppedImageUrl"></v-img>
  <v-dialog
    v-model="cropDialog"
    fullscreen
    transition="dialog-bottom-transition"
  >
    <v-toolbar dark color="primary">
      <v-btn icon dark @click="closeCropDialog">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>Photo</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn dark text @click="cropImage"> Recadrer </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-card flat>
      <cropper
        :stencil-props="{ aspectRatio: 640 / 427 }"
        ref="cropper"
        class="photo-cropper"
        :src="selectedImage"
      />
    </v-card>
  </v-dialog>
</template>

<script>
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";

export default {
  name: "compost-image-component",
  components: { Cropper },
  props: {},
  data() {
    return {
      cropDialog: false,
      image: [],
      imageRules: [
        (value) => {
          return (
            !value ||
            !value.length ||
            value[0].size < 2000000 ||
            "La taille de la image ne doit pas dépasser 2 MB!"
          );
        },
      ],
      selectedImage: null,
      croppedImageUrl: null,
      croppedImageData: null,
    };
  },
  methods: {
    openCropDialog(event) {
      this.reset();
      this.selectedImage = URL.createObjectURL(event.target.files[0]);
      this.cropDialog = true;
    },
    closeCropDialog() {
      this.cropDialog = false;
    },
    reset() {
      this.croppedImageUrl = null;
      this.croppedImageData = null;
    },
    cropImage() {
      const { canvas } = this.$refs.cropper.getResult();
      canvas.toBlob((blob) => {
        this.croppedImageData = blob;
      }, this.selectedImage.type);
      this.croppedImageUrl = canvas.toDataURL("image/jpeg");
      this.cropDialog = false;
    },
  },
};
</script>

<style>
.photo-cropper {
  border: solid 1px #eee;
  min-height: 300px;
  width: 100%;
  height: 85vh;
}
</style>
