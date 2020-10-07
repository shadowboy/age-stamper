<template>
  <v-main class="d-flex" style="justify-content:center; align-items:center;">
    <router-view></router-view>
  </v-main>
</template>

<script lang="ts">
export default {
  props: {
    source: String
  },
  data() {
    return {
      drawer: false
    };
  }
};
</script>

