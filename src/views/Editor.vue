<template>
  <div class="home">
    <h2>Editor</h2>
    <img style="margin: 1rem auto;" alt="Vue logo" src="../assets/logo.png" />
    <h2 style="margin: 1rem auto;">logo</h2>
    <router-link to="/home">home</router-link> |
    <router-link to="/result">result</router-link> |
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "editor",
  components: {},
});
</script>
