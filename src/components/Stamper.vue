<template>
  <div style="position: absolute;" v-drag.window-only>
    <div><slot></slot></div>
  </div>
</template>

<script>
import drag from "@branu-jp/v-drag";

export default {
  directives: {
    drag
  }
};
</script>

<style>
</style>