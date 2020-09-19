<template>
  <div class="home">
    <img style="margin: 1rem auto;" alt="Vue logo" src="../assets/logo.png" />
    <h2 style="margin: 1rem auto;">logo</h2>
    <router-link to="/editor">editor</router-link> |
    <router-link to="/guidance">help</router-link>

    <EventCard v-for="n in 3" :key="n"> </EventCard>
    <HelloWorld />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import EventCard from "../components/EventCard";
import HelloWorld from "../components/HelloWorld";

export default Vue.extend({
  name: "home",
  components: {
    EventCard,
    HelloWorld,
  },
});
</script>
