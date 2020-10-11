<template>
  <v-card class="mx-auto text-center" max-width="500" style="padding: 3rem;">
    <v-img
      src="img/preload-loading.png"
      width="200"
      style="margin:1rem auto;"
    />
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Index",
  mounted: function() {
    setTimeout(() => {
      if (parseInt(localStorage.visitCount) > 1) {
        this.$router.push({ path: "home" });
      } else {
        localStorage.visitCount = 0;
        this.$router.push({ path: "guidance" });
      }
      localStorage.visitCount++;
    }, 1000);
  }
});
</script>
