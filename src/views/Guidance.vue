<template>
  <div>
    <h1>Guidance</h1>
    <p>Hello, this is the guidance page</p>
    <router-link to="/home">home</router-link>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "guidance",
  data() {
    return { msg: "message" };
  },
  created: function() {
    console.log("guidance created..");
  },
});
</script>

<style></style>
