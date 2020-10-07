<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" absolute left temporary>
      <v-btn class="mx-" fab color="gray" to="/settings">
        <v-icon dark>mdi-cog</v-icon>
      </v-btn>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-toolbar-title><v-btn text to="/">Age Stamper</v-btn></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>

    <router-view></router-view>
    <v-footer><v-spacer></v-spacer> v2020</v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",

  components: {},

  data: () => ({
    drawer: false
  })
});
</script>
