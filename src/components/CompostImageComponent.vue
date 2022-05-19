<template>
  <v-file-input
    v-model="imageInput"
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
    show-size
  ></v-file-input>
  <v-layout justify-center>
    <v-img
      v-if="previewImage"
      :src="previewImage"
      max-width="640"
      class="mx-auto"
    ></v-img>
  </v-layout>

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
        :src="selectedImageUrl"
      />
    </v-card>
  </v-dialog>
</template>

<script>
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import Pica from "pica";

export default {
  name: "compost-image-component",
  components: { Cropper },
  emits: ["updateImageDatas"],
  props: {
    image: {
      type: Object,
    },
  },
  data() {
    return {
      cropDialog: false,
      imageInput: [],
      imageRules: [
        (value) => {
          return (
            !value ||
            !value.length ||
            value[0].size < 5000000 ||
            "La taille de la image ne doit pas dépasser 5 MB!"
          );
        },
      ],
      selectedImageUrl: "",
      previewImage: "",
      imageDatas: {
        filename: "",
        file: "",
      },
    };
  },
  methods: {
    openCropDialog(event) {
      this.reset();
      this.selectedImageUrl = URL.createObjectURL(event.target.files[0]);
      this.cropDialog = true;
    },
    closeCropDialog() {
      this.cropDialog = false;
    },
    reset() {
      this.previewImage = "";
      this.imageDatas.filename = "";
      this.imageDatas.file = "";
    },
    async cropImage() {
      const pica = new Pica();
      const { canvas } = this.$refs.cropper.getResult();
      const resultCanvas = document.createElement("canvas");
      resultCanvas.width = 640;
      resultCanvas.height = 427;
      // TODO: improve space by using blob
      // canvas.toBlob((blob) => {
      //   this.imageDatas = {
      //     filename: this.imageInput[0].name,
      //     file: blob,
      //   };
      //   this.$emit("updateImageDatas", this.imageDatas);
      // });
      await pica.resize(canvas, resultCanvas, {
        unsharpAmount: 160,
        unsharpRadius: 0.6,
        unsharpThreshold: 1,
      });
      this.imageDatas = {
        filename: this.imageInput[0].name,
        file: resultCanvas.toDataURL("image/jpeg"),
      };
      this.$emit("updateImageDatas", this.imageDatas);
      this.setPreviewImage(this.imageDatas.file, this.imageDatas.filename);
      this.cropDialog = false;
    },
    setPreviewImage(file, filename) {
      this.previewImage = file;
      this.imageInput[0] = this.dataURLtoFile(file, filename);
    },
    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      return new File([u8arr], filename, { type: mime });
    },
  },
  watch: {
    image() {
      const image = this.$props.image;
      this.setPreviewImage(image.file, image.filename);
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
