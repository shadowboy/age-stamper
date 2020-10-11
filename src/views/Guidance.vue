<template>
  minor
  <v-card class="mx-auto text-center" width="600" style="padding: 3rem;">
    <h1>Guidance</h1>

    <v-carousel
      :continuous="false"
      :cycle="cycle"
      :show-arrows="true"
      hide-delimiter-background
      delimiter-icon="mdi-minus"
      height="160"
    >
      <v-carousel-item v-for="(item, i) in guidences" :key="i">
        <p style="color: #666; margin: auto 3rem; padding-top:3rem;">
          {{ item }}
        </p>
      </v-carousel-item>
    </v-carousel>
    <v-btn large color="primary" to="/home">Next</v-btn>
  </v-card>
</template>

<script>
import Vue from "vue";
import UserEventMgr from "../utils/UserEventMgr";
export default Vue.extend({
  name: "guidance",
  data() {
    return {
      msg: "message",
      guidences: [
        "Age Stamper is a super useful and convenient tool for adding text to photos.",
        "It can help you remember the children's age in detail and accurately, no matter the age is just a few weeks after birth or a teenager.",
        "Don't miss every moment, easily add trace of time to your lovely photo."
      ]
    };
  },
  created: function() {
    console.log("guidance created..");

    const ueMgr = new UserEventMgr();
    ueMgr.addExample();
  }
});
</script>

<style></style>
