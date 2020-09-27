<style scoped>
.file-input {
  display: none;
}
</style>
<template>
  <div>
    <div class="imageEditorApp"></div>
    <div ref="captureTarget" style="padding: 10px" align="center">
      <h1>
        Hello World
      </h1>
      <h1>
        Hello World
      </h1>
      <h1>
        Hello World
      </h1>
      <stamper />
    </div>
    <router-link to="/home">home</router-link>|
    <router-link to="/result">result</router-link>
    <button large @click="downloadVisualReport">Capture</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import html2canvas from "html2canvas";
import Stamper from "../components/Stamper.vue";

export default Vue.extend({
  name: "editor",
  components: {
    stamper: Stamper
  },
  data() {
    return {
      useDefaultUI: true,
      captureTarget: null,
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
    },
    downloadVisualReport() {
      html2canvas(this.$refs.captureTarget as HTMLElement)
        .then((canvas: any) => {
          document.body.appendChild(canvas);
        })
        .catch(error => {
          console.log("Erorr descargando reporte visual", error);
        });
    }
  }
});
</script>
