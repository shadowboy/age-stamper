<style scoped>
.file-input {
  display: none;
}
.imageEditorApp {
  width: 1000px;
  height: 800px;
}
</style>
<template>
  <div>
    <div class="imageEditorApp">
      <tui-image-editor
        ref="tuiImageEditor"
        :include-ui="useDefaultUI"
        :options="options"
        @addText="onAddText"
        @objectMoved="onObjectMoved"
      ></tui-image-editor>
    </div>
    <v-row align="center"></v-row>

    <router-link to="/home">home</router-link>|
    <router-link to="/result">result</router-link>|
    <v-row align="center">
      <v-btn x-large max-height="100" color="blue-grey" class="ma-2 white--text" @click="pickImage">
        Upload
        <input type="file" class="file-input" ref="fileInput" @input="fileSelected" />
        <v-icon right dark>mdi-image-size-select-actual</v-icon>
      </v-btn>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ImageEditor from "@toast-ui/vue-image-editor/src/ImageEditor.vue";
// To use the basic UI, the svg files for the icons is required.
import "tui-image-editor/dist/svg/icon-a.svg";
import "tui-image-editor/dist/svg/icon-b.svg";
import "tui-image-editor/dist/svg/icon-c.svg";
import "tui-image-editor/dist/svg/icon-d.svg";

// Load Style Code
import "tui-image-editor/dist/tui-image-editor.css";

export default Vue.extend({
  name: "editor",
  components: {
    "tui-image-editor": ImageEditor
  },
  data() {
    return {
      useDefaultUI: true,
      options: {
        includeUI: {
          loadImage: {
            path: "https://i.imgur.com/QRX29tf.jpg",
            name: "SampleImage"
          },
          initMenu: "filter",
          menu: ["shape", "crop", "text"]
        },
        cssMaxWidth: 900,
        cssMaxHeight: 500
      }
    };
  },
  methods: {
    pickImage: function() {
      (this.$refs.fileInput as HTMLInputElement).click();
    },
    fileSelected: function() {
      const input: HTMLInputElement = this.$refs.fileInput as HTMLInputElement;
      const files = input.files;
      console.log("fileSelected files", files);
      if (files && files[0]) {
        // this.readFile(files[0]);
        // this.$emit("input", files[0]);
        // const blob: Blob = files[0];
        // this.$router.push({ path: "editor", params: { file: "blob" } });
      }
    },
    readFile: function(file: Blob) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const imageData = (e.target as FileReader).result;
        console.log("imageData", imageData);
      };
      reader.readAsDataURL(file);
    },
    onAddText(pos: any) {
      console.log("imageData");
    },
    onObjectMoved(props: any) {
      console.log("imageData");
    }
  }
});
</script>
