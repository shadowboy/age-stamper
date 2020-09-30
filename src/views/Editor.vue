<style scoped>
.file-input {
  display: none;
}
</style>
<template>
  <!-- select section -->
  <div v-if="state == 'select'">
    <div class="d-flex flex-column mb-6">Select Image You Want To Stamp</div>
    <div class="d-flex flex-column mb-6">
      <v-btn large color="primary" @click="$refs.fileInput.click()">
        <input
          class="img-input"
          type="file"
          ref="fileInput"
          @change="fileSelected($event)"
          accept="image/*"
        />
        Upload image
      </v-btn>
    </div>
  </div>
  <!-- editing section -->
  <div v-else-if="state == 'editing'">
    <div class="imageEditorApp"></div>
    <div
      ref="captureTarget"
      style="padding: 10px; border: 3px solid #ffcc00; box-sizing:border-box;"
      align="center"
    >
      <img :src="editingImage" style="height: 80vh;width:100%;" />

      <stamper
        ><img
          ondragstart="return false;"
          style="width: 30px;height:auto;"
          v-for="c in characters"
          :key="c"
          :src="'/img/themes/bubble/' + c + '.png'"
      /></stamper>
    </div>
    <router-link to="/home">home</router-link>|
    <router-link to="/result">result</router-link>
    <button large color="primary" @click="downloadVisualReport">Capture</button>
    <v-btn large color="primary" @click="$refs.fileInput.click()">
      <input
        class="img-input"
        type="file"
        ref="fileInput"
        @change="fileSelected($event)"
        accept="image/*"
      />
      Upload image
    </v-btn>
    <v-btn color="orange" dark @click="sheet = !sheet">Styles </v-btn>
    <!-- Sheet -->
    <v-bottom-sheet v-model="sheet">
      <v-sheet class="text-center" height="60vh">
        <v-btn class="mt-6" text color="error" @click="sheet = !sheet">
          close
        </v-btn>
        <v-container class="grey lighten-5 mb-6">
          <v-row
            align="center"
            no-gutters
            style="height: auto; padding: 0.5rem;"
          >
            <v-col v-for="n in 3" :key="n">
              <v-btn large color="primary">
                <v-card class="pa-2" outlined tile>
                  One of three columns
                </v-card>
              </v-btn>
            </v-col>
          </v-row>

          <v-row align="center" no-gutters style="height: auto;">
            <v-col v-for="n in 3" :key="n * 2">
              <v-card class="pa-2" outlined tile>
                One of three columns
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script lang="ts">
import html2canvas from "html2canvas";
import Stamper from "../components/Stamper.vue";

export default {
  name: "editor",
  components: {
    stamper: Stamper
  },
  data() {
    return {
      useDefaultUI: true,
      state: "select",
      captureTarget: null,
      editingImage: null,
      sheet: false,
      characters: ["0", "1", "2", "3", "yue", "nian"],
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
    pickImage() {
      (this.$refs.fileInput as HTMLInputElement).click();
    },

    fileSelected(evt: Event) {
      const input: HTMLInputElement = this.$refs.fileInput as HTMLInputElement;
      const files = input.files;
      console.log("fileSelected files", files);
      if (files && files[0]) {
        this.readFile(files[0], (imageData: any) => {
          this.editingImage = imageData;
          this.state = "editing";
        });
      }
    },
    readFile(file: Blob, callback: Function) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const imageData = (e.target as FileReader).result;
        // console.log("imageData", imageData);
        callback(imageData);
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
};
</script>
<style scoped>
.img-input {
  display: none;
}
</style>
