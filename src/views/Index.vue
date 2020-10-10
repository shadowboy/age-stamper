<template>
  <v-card class="mx-auto text-center" max-width="500" style="padding: 3rem;">
    <h1>Age Stamper</h1>
    <p>
      Don't miss every moment, easily add trace of time to your lovely photo.
    </p>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Index",

  created: function() {
    console.log("created");
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
