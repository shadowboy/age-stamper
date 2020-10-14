<template>
  <div>
    <!-- select section -->
    <v-dialog v-model="unselected" width="500">
      <v-card
        class="d-flex flex-column justify-center align-center"
        style="padding: 1rem ;"
      >
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
    </v-dialog>
    <!-- editing section -->
    <v-card max-width="600" style="margin: 1rem auto; padding: 1rem;">
      <v-flex v-if="debugMode == true">
        width:{{ editImgWidth }},height:{{ editImgHeight }}
        <p>{{ $route.params.time }}</p>
      </v-flex>
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
          @click="captureEditedImage"
        >
          <v-icon>mdi-content-save</v-icon>
          <span>Save</span>
        </v-btn>
      </div>

      <div ref="editContainer" class="img-container">
        <!--  :style="{ width: `${editImgWidth}px`, height: `${editImgHeight}px` }" -->
        <img
          ref="editImg"
          class="edited-img"
          :src="editingImage"
          @load="onImageLoaded"
        />
        <vue-draggable-resizable
          w="auto"
          h="auto"
          :resizable="false"
          :parent="true"
          :lock-aspect-ratio="true"
          class="stamper"
        >
          <img
            ondragstart="return false;"
            style="width:30px; height:30px"
            v-for="(c, index) in characters"
            :key="index"
            :src="'img/themes/' + selectedStyleFolder + '/' + c + '.png'"
          />
        </vue-draggable-resizable>
      </div>
      <div class="d-flex" flat tile style="padding: 10px;">
        <v-btn color="primary" class="ml-auto" @click="showSheet = true">
          <v-icon>mdi-palette</v-icon>
          <span>Styles</span>
        </v-btn>
      </div>
      <!-- bottom sheet -->
      <v-bottom-sheet v-model="showSheet">
        <v-sheet height="60vh" style="padding-top:1rem;">
          <v-btn icon @click="showSheet = false">
            <v-icon>mdi-arrow-down-drop-circle</v-icon>
          </v-btn>
          <style-sheet v-on:itemSelected="styleItemSelected" />
        </v-sheet>
      </v-bottom-sheet>
    </v-card>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
import "vue-draggable-resizable/dist/VueDraggableResizable.css";
import VueDraggableResizable from "vue-draggable-resizable";
import StyleSheet from "../components/StyleSheet.vue";
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
    "vue-draggable-resizable": VueDraggableResizable,
    "style-sheet": StyleSheet
  },
  data() {
    return {
      debugMode: true,
      useDefaultUI: true,
      // toImageDataURL: null,
      unselected: true,
      editImg: null,
      editImgWidth: 200,
      editImgHeight: 200,
      editContainer: null,
      editingImage: null,
      showSheet: false,
      selectedStyleFolder: "bubble",
      loading: false,
      characters: []
    };
  },
  created() {
    const timeUtil = new TimeUtils(this.$route.params.time);
    const str = timeUtil.getAdaptive();

    for (let i = 0; i < str.length; i++) {
      let character = str[i];
      if (characterMap.has(character)) {
        character = characterMap.get(character);
      }
      this.characters.push(character);
    }
  },
  methods: {
    pickImage() {
      this.$refs.fileInput.click();
    },
    fileSelected() {
      const input = this.$refs.fileInput;
      const files = input.files;
      if (files && files[0]) {
        this.readFile(files[0], imageData => {
          this.editingImage = imageData;
          this.unselected = false;
        });
      }
    },
    readFile(file, callback) {
      const reader = new FileReader();
      reader.onload = evt => {
        const imageData = evt.target.result;
        callback(imageData);
      };
      reader.readAsDataURL(file);
    },

    captureEditedImage() {
      this.loading = true;
      html2canvas(this.$refs.editContainer, {})
        .then(canvas => {
          this.loading = false;
          const base64Image = canvas.toDataURL("image/jpeg", 0.8);
          const blob = this.base64ToBlob(base64Image);
          const url = URL.createObjectURL(blob);
          this.downloadURL(url, this.$route.params.time);
        })
        .catch(error => {
          console.log("capture image failed", error);
        });
    },

    styleItemSelected(itemData) {
      if (itemData) this.selectedStyleFolder = itemData.folder;
      this.showSheet = false;
    },

    onImageLoaded(evt) {
      console.log("evt", evt);
      console.log("editImg.style.width", this.$refs.editImg.width);
      console.log("editImg.style.height", this.$refs.editImg.height);
      this.editImgWidth = this.$refs.editImg.width;
      this.editImgHeight = this.$refs.editImg.height;
    },

    base64ToBlob(base64) {
      const parts = base64.split(";base64,");
      const contentType = parts[0].split(":")[1];
      const raw = window.atob(parts[1]);
      const rawLength = raw.length;
      const uInt8Array = new Uint8Array(rawLength);
      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }
      return new Blob([uInt8Array], { type: contentType });
    },

    downloadURL(url, fileName = "download") {
      try {
        const a = document.createElement("A");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } catch (err) {
        console.log("err", err);
      }
    }
  }
};
</script>

<style scoped>
.file-input {
  display: none;
}
.img-input {
  display: none;
}
.img-container {
  position: relative;
  width: 100%;
  height: 500px;
  /* border: 1px solid #ffcc00; */
  /* padding: 0px; */
  /* border: 1px solid #ffcc00; */
  /* box-sizing: border-box;
  background-size: cover;
  background-repeat: no-repeat; */
}
.edited-img {
  position: absolute;

  max-width: 100%;
  max-height: 100%;
  /* left: 50%;
  top: 50%;
  transform: translate(-50%, -50%); */
  /* object-fit: cover; */
}
.stamper {
  border: 0px solid #ff0000;
  /* padding: 4px; */
  display: flex;
  flex-direction: row;
}
.drag-resize-class {
  width: auto;
  height: auto;
  /* border: 10px solid red; */
}
</style>
