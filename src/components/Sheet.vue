<template>
  <v-container>
    <v-row no-gutters>
      <v-col
        v-for="(style, index) in styles"
        :key="index"
        no-gutters
        cols="12"
        sm="4"
      >
        <v-card
          class="pa-2 element-container"
          outlined
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
import styleData from "../assets/styles.json";

export default {
  data() {
    return {
      styles: styleData.data.styles,
      elements: styleData.data.file_list,
      exampleString: "2,1,3,4,nian,6,yue,7,tian"
    };
  },

  methods: {
    itemClickHandler(itemData) {
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