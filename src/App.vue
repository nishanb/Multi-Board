<template>
  <div class="main">
    <CanvaBoard class="main" />
  </div>
</template>

<script>
import CanvaBoard from "./components/CanvaBoard.vue";
export default {
  name: "App",
  data() {
    return {
      con: null,
    };
  },
  components: {
    CanvaBoard,
  },
};
</script>
<style>
* {
  padding: 0px !important;
  margin: 0px !important;
}
</style>