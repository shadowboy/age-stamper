<template>
  <!-- Sheet -->

  <v-container>
    <v-row no-gutters>
      <v-col v-for="(style, index) in styles" :key="index" cols="12" sm="4">
        <v-card class="pa-2" outlined tile>
          One of three columns
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  //   props: ["show"],
  data() {
    const styleList = [
      { id: "1" },
      { id: "2" },
      { id: "3" },
      { id: "4" },
      { id: "5" },
      { id: "6" },
      { id: "7" },
      { id: "8" },
      { id: "9" }
    ];
    return {
      styles: styleList
    };
  },
  created() {
    // this.isShowed = this.show;
  },
  methods: {}
};
</script>

<style>
</style>