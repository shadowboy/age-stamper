<template>
  <div>
    <div v-for="(scene, i) in scenes" :key="i">
      {{ scene.label }}
      <img :src="'/img/' + scene.image" />
    </div>
    <router-link to="/home">home</router-link>
  </div>
</template>

<script>
import { scenes } from "../config/App";
export default {
  data() {
    return {
      scenes: scenes
    };
  }
};
</script>
