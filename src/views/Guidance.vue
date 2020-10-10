<template>
  <v-card class="mx-auto text-center" width="500" style="padding: 3rem;">
    <h1>Guidance</h1>
    <p>
      Age Stamper is a super useful and convenient tool for adding text to
      photos.
    </p>
    <p>
      It can help you remember the children's age in detail and accurately, no
      matter the age is just a few weeks after birth or a teenager.
    </p>
    <router-link to="/home">Next</router-link>
  </v-card>
</template>

<script>
import Vue from "vue";
import UserEventMgr from "../utils/UserEventMgr";
export default Vue.extend({
  name: "guidance",
  data() {
    return { msg: "message" };
  },
  created: function() {
    console.log("guidance created..");

    const ueMgr = new UserEventMgr();
    ueMgr.addExample();
  }
});
</script>

<style></style>
