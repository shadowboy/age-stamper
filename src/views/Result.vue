<template>
  <div class="home">
    <h2 style="margin: 1rem auto;">Result</h2>
    <router-link to="/editor">editor</router-link> |
    <router-link to="/">home</router-link> |
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "result",
  components: {},
});
</script>
