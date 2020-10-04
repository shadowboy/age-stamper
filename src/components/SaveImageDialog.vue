<template>
  <v-card>
    <v-card-title>Download Picuture</v-card-title>
    <v-card-text>
      <img :src="imgData" />
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn color="primary" @click="downloadImage(imgData)">Download</v-btn>
      <v-spacer></v-spacer>
      <slot></slot>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ["imgDataURL"],
  data() {
    return {
      imgData: null
    };
  },
  watch: {
    imgDataURL: {
      immediate: true,
      handler: function(value) {
        if (value) {
          this.imgData = this.imgDataURL;
        }
      }
    }
  },
  methods: {
    downloadImage: function(file, downloadName = "download") {
      const filePath = file;
      const a = document.createElement("A");
      a.href = filePath;
      a.download = downloadName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }
};
</script>

<style scoped>
img {
  width: 100%;
  height: auto;
}
</style>
