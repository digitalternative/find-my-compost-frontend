<template>
  <div>
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
    ></v-file-input>
    <v-img v-if="previewImage" :src="previewImage"></v-img>
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
  </div>
</template>

<script>
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";

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
            value[0].size < 2000000 ||
            "La taille de la image ne doit pas dépasser 2 MB!"
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
    cropImage() {
      const { canvas } = this.$refs.cropper.getResult();
      // TODO: improve space by using blob
      // canvas.toBlob((blob) => {
      //   this.imageDatas = {
      //     filename: this.imageInput[0].name,
      //     file: blob,
      //   };
      //   this.$emit("updateImageDatas", this.imageDatas);
      // });
      this.imageDatas = {
        filename: this.imageInput[0].name,
        file: canvas.toDataURL("image/jpeg"),
      };
      this.$emit("updateImageDatas", this.imageDatas);
      this.previewImage = canvas.toDataURL("image/jpeg");
      this.cropDialog = false;
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
      this.previewImage = image.file;
      this.imageInput[0] = this.dataURLtoFile(image.file, image.filename);
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
