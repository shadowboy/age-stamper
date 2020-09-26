<template>
  <div class="home">
    <v-alert
      v-model="error"
      dismissible
      close-icon="mdi-delete"
      color="cyan"
      border="left"
      elevation="2"
      colored-border
      icon="mdi-twitter"
    >
      You've got <strong>5</strong> new updates on your timeline!.
    </v-alert>

    <div class="d-flex flex-column mb-6">
      <template v-if="userEvents == null">
        <v-card class="mx-auto" max-width="344" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              You don't have any event, click the button to add new event.
            </v-list-item-content>
          </v-list-item>
          <v-card-actions>
            <v-btn class="mx-2" fab dark color="indigo" to="/addevent">
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
      <template v-else>
        <div>
          <v-btn class="mx-2" fab dark color="indigo" to="/addevent">
            <v-icon dark>mdi-plus</v-icon>
          </v-btn>
          <v-btn class="mx-2" fab dark color="indigo" to="/settings">
            <v-icon dark>settings-outline</v-icon>
          </v-btn>
        </div>
        <v-carousel
          cycle
          height="400"
          hide-delimiter-background
          show-arrows-on-hover
        >
          <v-carousel-item
            v-for="(event, i) in userEvents"
            :key="i"
            reverse-transition="fade-transition"
            transition="fade-transition"
          >
            <EventCard :item-data="event" v-on:editEvent="itemEditHandler" />
          </v-carousel-item>
        </v-carousel>
        <v-btn text small>Normal</v-btn>
        <v-btn
          x-large
          max-height="100"
          color="blue-grey"
          class="ma-2 white--text"
          to="/shoot"
        >
          Camera
          <v-icon right dark>mdi-camera-plus</v-icon>
        </v-btn>
        <router-link to="/cropimage">crop</router-link>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import EventCard from "@/components/EventCard.vue";
import { TimeUtils } from "../utils/TimeUtils";
import { scenes } from "../config/App";

export default Vue.extend({
  name: "home",
  components: {
    EventCard
    // HelloWorld
  },
  data() {
    return {
      userEvents: null,
      error: false
    };
  },
  created() {
    console.log("home page created");
    if (localStorage.getItem("userEvents")) {
      try {
        this.userEvents = JSON.parse(
          localStorage.getItem("userEvents") as string
        );
      } catch (error) {
        console.log("error", error);
        this.error = true;
      }
    }
    this.userEvents.forEach(event => {
      console.log("event", event);
      const status = this.getThemeStatus(event);
      console.log("status", status);
      event.status = status;
    });
  },
  watch: {},
  methods: {
    itemEditHandler(itemData: any) {
      console.log("itemData", itemData.id);
    },
    getThemeStatus(event: any) {
      const scene = scenes[event.scene];
      console.log("scene", scene);
      const format = event.timeFormat ? event.timeFormat : scene.format;

      const timeUtil = new TimeUtils(event.start, 0, scene.format);
      let status = scene.status[0];
      status = status.replace("%name%", event.entity);
      status = status.replace("%time%", timeUtil.getByFormat(format));
      return status;
    }
  }
});
</script>
