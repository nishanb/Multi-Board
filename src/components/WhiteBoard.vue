<template>
  <div
    :style="{
      'background-image': 'url(' + require('./../assets/paper.jpeg') + ')',
      'background-size': '50vw auto',
    }"
  >
    <vue-whiteboard class="board" :backgroundColor="layer" />
  </div>
</template>

<script>
import VueWhiteboard from "@beauagst/vue-whiteboard";

export default {
  components: {
    VueWhiteboard,
  },
  data() {
    return {
      layer: "#ffffff00",
    };
  },
};
</script>

<style scoped>
.board {
  width: 100%;
  height: 100vh;
}
</style>