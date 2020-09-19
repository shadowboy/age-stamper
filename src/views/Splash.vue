<template>
  <div>
    <h1>Splash</h1>
    <p>Hello, this is the splash page</p>
    <router-link to="/guidance">guidance</router-link>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      msg: ""
    };
  },
  created: function() {
    console.log("splash created");
  }
});
</script>

<style></style>
