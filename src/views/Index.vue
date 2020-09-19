<template>
  <div class="about">
    <h1>This is an Index page</h1>
    <p>{{ msg }}</p>
    <router-link to="/guidance">guidance</router-link>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Index",
  data() {
    return {
      msg: "hello"
    };
  },
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
