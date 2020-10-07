<style scoped>
.file-input {
  display: none;
}
</style>
<template>
  <!-- select section -->
  <v-card
    v-if="state == 'select'"
    class="d-flex flex-column justify-center align-center"
    style="margin: 1rem auto"
    max-width="500"
    min-height="200"
  >
    <p>{{ $route.params.time }}</p>
    <p>Select Image You Want To Stamp</p>

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
  </v-card>
  <!-- editing section -->
  <v-card v-else-if="state == 'editing'">
    <div class="d-flex" flat tile style="padding: 6px;">
      <v-btn color="secondary" to="/home">
        <v-icon>mdi-arrow-left-circle</v-icon>
        <span>Back</span>
      </v-btn>
      <v-btn
        color="secondary"
        style="margin-left: 10px;"
        @click="$refs.fileInput.click()"
      >
        <input
          class="img-input"
          type="file"
          ref="fileInput"
          @change="fileSelected($event)"
          accept="image/*"
        />
        <v-icon>mdi-file-upload</v-icon>
        <span>Change</span>
      </v-btn>
      <v-btn
        color="primary"
        class="ml-auto"
        :loading="loading"
        @click="downloadVisualReport"
      >
        <v-icon>mdi-content-save</v-icon>
        <span>Save</span>
      </v-btn>
    </div>
    <div
      ref="captureTarget"
      style="position: relative; width: 100%; height: 60vh;padding: 0px; border: 1px solid #ffcc00; box-sizing:border-box;"
    >
      <v-img
        :aspect-ratio="16 / 9"
        style="position: absolute; "
        width="100%"
        height="100%"
        :src="editingImage"
      ></v-img>
      <vue-draggable-resizable
        w="auto"
        h="auto"
        :resizable="false"
        :parent="true"
        :lock-aspect-ratio="true"
        style="border:1px;padding: 4px"
      >
        <img
          ondragstart="return false;"
          style="width:30px; height:30px"
          v-for="c in characters"
          :key="c"
          :src="'/img/themes/' + selectedStyleFolder + '/' + c + '.png'"
        />
      </vue-draggable-resizable>
    </div>

    <div class="d-flex mb-6" flat tile style="padding: 10px;">
      <v-btn color="primary" class="ml-auto" @click="showSheet = true">
        <v-icon>mdi-palette</v-icon>
        <span>Styles</span>
      </v-btn>
    </div>

    <!-- bottom sheet -->
    <v-bottom-sheet v-model="showSheet">
      <v-sheet class="text-center" height="60vh">
        <v-btn @click="showSheet = false">
          close
          <v-icon>mdi-close-circle</v-icon>
        </v-btn>
        <sheet v-on:itemSelected="styleItemSelected" />
      </v-sheet>
    </v-bottom-sheet>
  </v-card>
</template>

<script>
import html2canvas from "html2canvas";
// import Stamper from "../components/Stamper.vue";
import Sheet from "../components/Sheet.vue";
// import SaveImageDialog from "../components/SaveImageDialog.vue";
import VueDraggableResizable from "vue-draggable-resizable";
// optionally import default styles
import "vue-draggable-resizable/dist/VueDraggableResizable.css";
import { TimeUtils } from "../utils/TimeUtils";

const characterMap = new Map();
characterMap.set("岁", "sui");
characterMap.set("年", "nian");
characterMap.set("周", "zhou");
characterMap.set("月", "yue");
characterMap.set("天", "tian");
characterMap.set("个", "ge");
characterMap.set("个", "ge");

export default {
  name: "editor",
  components: {
    // stamper: Stamper,
    // "save-image-dialog": SaveImageDialog,
    "vue-draggable-resizable": VueDraggableResizable,
    sheet: Sheet
  },
  data() {
    return {
      useDefaultUI: true,
      toImageDataURL: null,
      state: "select",
      captureTarget: null,
      editingImage: null,
      showSheet: false,
      selectedStyleFolder: "bubble",
      showSaveImageDialog: false,
      loading: false,
      characters: [],
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
  created() {
    console.log("time:", this.$route.params.time);
    const timeUtil = new TimeUtils(this.$route.params.time);
    const str = timeUtil.getAdaptive();

    for (let i = 0; i < str.length; i++) {
      let character = str[i];
      if (characterMap.has(character)) {
        character = characterMap.get(character);
      }
      this.characters.push(character);
    }

    console.log("str:", str);
  },
  methods: {
    pickImage() {
      // @ts-ignore
      this.$refs.fileInput.click();
    },

    fileSelected() {
      // @ts-ignore
      const input = this.$refs.fileInput;
      const files = input.files;
      console.log("fileSelected files", files);
      if (files && files[0]) {
        this.readFile(files[0], imageData => {
          // @ts-ignore
          this.editingImage = imageData;
          // @ts-ignore
          this.state = "editing";
        });
      }
    },
    readFile(file, callback) {
      const reader = new FileReader();
      reader.onload = evt => {
        const imageData = evt.target.result;
        // console.log("imageData", imageData);
        callback(imageData);
      };
      reader.readAsDataURL(file);
    },
    onAddText(pos) {
      console.log("imageData");
    },
    onObjectMoved(props) {
      console.log("imageData");
    },
    downloadVisualReport() {
      // const self = this;
      // @ts-ignore
      this.loading = true;
      html2canvas(this.$refs.captureTarget)
        .then(canvas => {
          // document.body.appendChild(canvas);
          //@ts-ignore
          this.toImageDataURL = canvas.toDataURL();
          // this.showSaveImageDialog = true;
          this.loading = false;

          this.downloadImage(this.toImageDataURL, this.$route.params.time);
        })
        .catch(error => {
          console.log("Erorr descargando reporte visual", error);
        });
    },
    savedHandler() {
      console.log("saved");
    },
    sheetCloseHandler() {
      console.log("sheetCloseHandler");
      this.showSheet = false;
    },
    styleItemSelected(itemData) {
      this.selectedStyleFolder = itemData.folder;
      this.showSheet = false;
    },
    downloadImage(file, downloadName = "download") {
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
.img-input {
  display: none;
}
.drag-resize-class {
  width: auto;
  height: auto;
  border: 10px solid red;
}
</style>
