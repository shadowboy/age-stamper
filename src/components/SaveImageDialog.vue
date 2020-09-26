<template>
  <v-dialog v-model="showed" width="500">
    <v-card>
      <v-card-title>Download Picuture</v-card-title>
      <v-card-text>
        <img :src="imgData" />
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="primary" @click="downloadImage(imgData)">Download</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="closeHandler">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["imgDataURL"],
  data() {
    return {
      imgData: null,
      showed: true
    };
  },
  watch: {
    imgDataURL: {
      immediate: true,
      handler: function(value, old) {
        console.log("imgDataURL changed");
        if (value) {
          this.imgData = this.imgDataURL;
          this.showed = true;
        } else {
          this.showed = false;
        }
      }
    }
  },
  created: function() {
    console.log("created...");
    console.log("imgDataURL", this.imgDataURL);
    console.log("showed", this.showed);

    // console.log("this.imgDataURL.length", this.imgDataURL.length);
    // return;
    if (this.imgDataURL) {
      this.showed = true;
    } else {
      this.showed = false;
    }
  },
  disactivated: function() {
    console.log("disactivated...");
  },
  methods: {
    closeHandler: function() {
      this.imgData = null;
      this.showed = false;
      this.$emit("closeEvent");
    },
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