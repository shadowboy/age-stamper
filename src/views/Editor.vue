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
    <div>
      <router-link to="/home">home</router-link>|
      <router-link to="/result">result</router-link>
    </div>
    <div class="imageEditorApp"></div>
    <div
      ref="captureTarget"
      style="position: relative; width: 600px; height: 600px;padding: 0px; border: 1px solid #ffcc00; box-sizing:border-box;"
    >
      <img
        :src="editingImage"
        style="position: absolute; height: 100%; width:100%; object-fit: cover;"
      />
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

    <v-btn
      large
      color="primary"
      :loading="loading"
      @click="downloadVisualReport"
      >Save</v-btn
    >
    <v-btn large color="primary" @click="$refs.fileInput.click()">
      <input
        class="img-input"
        type="file"
        ref="fileInput"
        @change="fileSelected($event)"
        accept="image/*"
      />
      Change Photo
    </v-btn>
    <v-btn large color="primary" @click="showSheet = true">Styles </v-btn>
    <!-- save image dialog -->
    <v-dialog v-model="showSaveImageDialog" width="500">
      <save-image-dialog :imgDataURL="toImageDataURL">
        <v-btn color="primary" @click="showSaveImageDialog = false">
          Close
        </v-btn>
      </save-image-dialog>
    </v-dialog>

    <!-- bottom sheet -->
    <v-bottom-sheet v-model="showSheet">
      <v-sheet class="text-center" height="60vh">
        <v-btn class="mt-6" text color="error" @click="showSheet = false">
          close
        </v-btn>
        <sheet v-on:itemSelected="styleItemSelected" />
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
// import Stamper from "../components/Stamper.vue";
import Sheet from "../components/Sheet.vue";
import SaveImageDialog from "../components/SaveImageDialog.vue";
import VueDraggableResizable from "vue-draggable-resizable";
// optionally import default styles
import "vue-draggable-resizable/dist/VueDraggableResizable.css";

export default {
  name: "editor",
  components: {
    // stamper: Stamper,
    "save-image-dialog": SaveImageDialog,
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
      characters: ["0", "1", "2", "3", "yue", "nian", "9"],
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
          this.showSaveImageDialog = true;
          this.loading = false;
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
