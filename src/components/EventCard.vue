<template>
  <v-card class="mx-auto">
    <div class="no-data" v-if="itemData == null">No data!</div>
    <template v-else>
      <v-img
        class="white--text align-end"
        height="200px"
        :src="'/img/' + itemData.image"
      ></v-img>
      <v-card-title>{{ itemData.entity }}</v-card-title>
      <v-card-subtitle class="pb-0">{{ itemData.start }}</v-card-subtitle>
      <v-card-text class="text">{{ itemData.status }}</v-card-text>
      <v-card-actions class="text-end">
        <v-btn color="orange" text v-on:click="editHandler">Edit</v-btn>
      </v-card-actions>
    </template>
  </v-card>
</template>
<script lang="js">
export default {
  name: "EventCard",
  props: {
    itemData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      // itemData:{
      //   id:12,
      //   title:'write diary',
      //   description: '2year3month',
      //   startedTime:'2020-09-20'
      // },
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
<style scoped>
.no-data {
  color: #ffcc00;
  text-align: center;
}
</style>
