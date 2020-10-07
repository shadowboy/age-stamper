<template>
  <!-- Sheet -->

  <v-container>
    <v-row no-gutters>
      <v-col v-for="(style, index) in styles" :key="index" cols="12" sm="4">
        <v-card
          class="pa-2 element-container"
          outlined
          tile
          @click="itemClickHandler(style)"
        >
          <img
            v-for="ele in exampleString.split(',')"
            :key="ele"
            :src="'img/themes/' + style.folder + '/' + ele + '.png'"
            class="element"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// const styleData = require("../assets/styles.json");
import styleData from "../assets/styles.json";
console.log(styleData);
export default {
  //   props: ["show"],
  data() {
    // const styleList = [
    //   { id: "1" },
    //   { id: "2" },
    //   { id: "3" },
    //   { id: "4" },
    //   { id: "5" },
    //   { id: "6" },
    //   { id: "7" },
    //   { id: "8" },
    //   { id: "9" }
    // ];
    return {
      // styles: styleList,
      styles: styleData.data.styles,
      elements: styleData.data.file_list,
      exampleString: "2,1,3,4,nian,6,yue,7,tian"
    };
  },
  created() {
    // this.isShowed = this.show;
  },
  methods: {
    itemClickHandler(itemData) {
      // console.log("itemClickHandler", itemData);
      this.$emit("itemSelected", itemData);
    }
  }
};
</script>

<style scoped>
.element-container {
  vertical-align: middle;
}
.element {
  width: auto;
  height: 30px;
  line-height: 2rem;
  margin-right: -1px;
}
</style>