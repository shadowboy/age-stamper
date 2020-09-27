<template>
  <div style="position: absolute;" v-drag.window-only>
    This element cannot be dragged outside the window
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