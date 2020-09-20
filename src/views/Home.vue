
<template>
  <div class="home">
    <div class="d-flex flex-column mb-6">
      <v-btn text small>Normal</v-btn>
      <v-carousel cycle height="400" hide-delimiter-background show-arrows-on-hover>
        <v-carousel-item
          v-for="(slide, i) in slides"
          :key="i"
          reverse-transition="fade-transition"
          transition="fade-transition"
        >
          <EventCard v-on:editEvent="itemEditHandler" />
        </v-carousel-item>
      </v-carousel>
    </div>

    <router-link to="/shoot">
      <v-btn x-large max-height="100" color="blue-grey" class="ma-2 white--text">
        Camera
        <v-icon right dark>mdi-camera-plus</v-icon>
      </v-btn>
    </router-link>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import EventCard from "@/components/EventCard.vue";

export default Vue.extend({
  name: "home",
  components: {
    EventCard
    // HelloWorld
  },
  data() {
    return {
      colors: [
        "indigo",
        "warning",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4"
      ],
      slides: ["First", "Second", "Third", "Fourth", "Fifth"],
      loader: false
    };
  },
  watch: {
    loader() {
      setTimeout(() => (this.loader = false), 3000);
      this.loader = false;
    }
  },
  methods: {
    itemEditHandler: function(itemData: any) {
      console.log("itemData", itemData.id);
    }
  }
});
</script>
