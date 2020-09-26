<template>
  <div style="text-align: center;">
    <div class="button-wrapper">
      <v-btn large color="primary" @click="$refs.file.click()">
        <input
          class="img-input"
          type="file"
          ref="file"
          @change="uploadImage($event)"
          accept="image/*"
        />
        Upload image
      </v-btn>
    </div>
    <v-btn large color="primary" @click="cropImage">Crop Image</v-btn>
    <cropper
      :src="selectedImage"
      :stencil-component="$options.components.CircleStencil"
      ref="cropper"
    />
    <save-image-dialog
      :imgDataURL="toImageDataURL"
      v-on:closeEvent="savedHandler"
    />
    <router-link to="/home">Home</router-link>
  </div>
</template>

<script>
import { Cropper } from "vue-advanced-cropper";
import SaveImageDialog from "../components/SaveImageDialog.vue";

export default {
  name: "CropImage",
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "Cut Image Title",
    // all titles will be injected into this template
    titleTemplate: "%s | My Awesome Webapp"
  },
  components: {
    Cropper,
    "save-image-dialog": SaveImageDialog
    // CircleStencil
  },
  data() {
    return {
      toImageDataURL: null,
      selectedImage:
        "https://images.unsplash.com/photo-1485178575877-1a13bf489dfe?ixlib=rb-1.2.1&auto=format&fit=crop&w=991&q=80",
      showSaveDialog: false
    };
  },
  methods: {
    uploadImage(event) {
      // Reference to the DOM input element
      const input = event.target;
      // Ensure that you have a file before attempting to read it
      if (input.files && input.files[0]) {
        // create a new FileReader to read this image and convert to base64 format
        const reader = new FileReader();
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = e => {
          // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
          // Read image as base64 and set to imageData
          this.selectedImage = e.target.result;
          console.log(" this.selectedImage ", this.selectedImage);
        };
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsDataURL(input.files[0]);
      }
    },

    cropImage() {
      const { coordinates, canvas } = this.$refs.cropper.getResult();
      this.coordinates = coordinates;
      // You able to do different manipulations at a canvas
      // but there we just get a cropped image
      this.toImageDataURL = canvas.toDataURL();
      console.log("this.toImageDataURL ", this.toImageDataURL);

      this.showSaveDialog = true;
      // document.write(
      //   '<a href="' +
      //     this.toImageDataURL +
      //     '" download>Save as</a><br/><img src="' +
      //     this.toImageDataURL +
      //     '"></a>'
      // );
      // console.log("this.image", this.image);
    },
    savedHandler() {
      this.toImageDataURL = null;
      this.$router.push("/result");
    }
  }
};
</script>

<style>
.img-input {
  display: none;
}
</style>