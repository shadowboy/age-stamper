<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <router-view></router-view>
    </v-row>
  </v-container>
</template>

<script lang="ts">
export default {
  props: {
    source: String
  }
};
</script>
