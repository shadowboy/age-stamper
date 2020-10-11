<template>
  <v-card class="mx-auto">
    <div class="no-data" v-if="itemData == null">No data!</div>
    <template v-else>
      <v-img height="200px" :src="'img/' + itemData.image"></v-img>
      <v-btn
        icon
        absolute
        style="right: 0rem; top:0rem;"
        color="white"
        text
        v-on:click="editHandler"
      >
        <v-icon>mdi-cog</v-icon>
      </v-btn>
      <v-card-title>{{ itemData.entity }}</v-card-title>
      <v-card-subtitle class="pb-0">
        <v-icon>mdi-clock-start</v-icon>
        <span>{{ itemData.start }}</span>
      </v-card-subtitle>
      <v-card-text class="text">{{ itemData.status }}</v-card-text>
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
