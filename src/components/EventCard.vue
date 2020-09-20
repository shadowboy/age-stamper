<template>
  <v-card class="mx-auto" max-width="400">
    <v-img
      class="white--text align-end"
      height="200px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    ></v-img>
    <v-card-title>{{itemData.title}}</v-card-title>
    <v-card-subtitle class="pb-0">{{itemData.description}}</v-card-subtitle>

    <v-card-text class="text">{{itemData.startedTime}}</v-card-text>

    <v-card-actions class="text-end">
      <v-btn color="orange" text v-on:click="editHandler">Edit</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script lang="js">
import Vue from "vue";

export default {
  name: "EventCard",
  data() {
    return {
      itemData:{
        id:12,
        title:'write diary',
        description: '2year3month',
        startedTime:'2020-09-20'
      },
      msg: "msg",
    };
  },
  methods:{
    editHandler: function(event){
      console.log('editHandler');
      this.$emit('editEvent',this.itemData);
    }
  }
};
</script>
