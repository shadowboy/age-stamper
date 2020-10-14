<template>
  <v-card max-width="600" style="margin: 1rem auto; padding: 1rem;">
    <template v-if="userEvents.length < 1">
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
      <div class="d-flex" style="margin-bottom: 1rem;">
        <v-spacer></v-spacer>
        <v-btn class="mx-2" dark color="indigo" to="/addevent">
          Add New
          <v-icon>mdi-plus-circle-outline</v-icon>
        </v-btn>
      </div>
      <v-carousel
        :continuous="false"
        :cycle="false"
        v-model="eventIndex"
        height="400"
      >
        <v-carousel-item
          v-for="(event, i) in userEvents"
          :key="i"
          reverse-transition="scroll-x-reverse-transition"
          transition="scroll-x-transition"
        >
          <event-card :item-data="event" v-on:editEvent="itemEditHandler" />
        </v-carousel-item>
      </v-carousel>
      <div class="d-flex" style="margin-bottom: 1rem;">
        <v-spacer></v-spacer>
        <v-btn color="blue" class="ma-3 white--text" @click="nextHandler">
          Next
          <v-icon right dark>mdi-skip-next</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
      </div>
    </template>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import UserEventMgr from "../utils/UserEventMgr";
import EventCard from "@/components/EventCard.vue";
import { UserEvent, CategoryType } from "../types";
import { TimeUtils } from "../utils/TimeUtils";
import { scenes } from "../config/App";

export default Vue.extend({
  name: "home",
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: "Age Stamper",
    // all titles will be injected into this template
    titleTemplate: "%s | Home"
  },
  components: {
    "event-card": EventCard
  },
  data() {
    return {
      userEvents: [],
      eventIndex: 0,
      error: false
    };
  },
  created() {
    console.log("created");
  },
  mounted() {
    console.log("mounted");
    const ueMgr = new UserEventMgr();
    this.userEvents = ueMgr.load() as [];
    console.log("this.userEvents", this.userEvents);
    if (this.userEvents == null) return;

    this.userEvents.forEach((event: UserEvent) => {
      const status = this.updateEventStatus(event, scenes as CategoryType[]);
      event.status = status;
    });
  },
  methods: {
    itemEditHandler(itemData: UserEvent) {
      console.log("itemData", itemData);
    },
    nextHandler() {
      const itemData: any = this.userEvents[this.eventIndex];
      this.$router.push("/editor/" + itemData.start);
    },
    updateEventStatus(event: UserEvent, sceneList: CategoryType[]) {
      const scene: CategoryType = sceneList.find(
        (item: CategoryType) => item.id === event.scene
      ) as CategoryType;
      const format: string = event.timeFormat ? event.timeFormat : scene.format;
      // console.log("format", format);
      const timeUtil = new TimeUtils(event.start, format);
      let status = scene.status[0]; //which status format is used
      status = status.replace("%name%", event.entity);
      status = status.replace("%time%", timeUtil.getByFormat(format));
      return status;
    }
  }
});
</script>
