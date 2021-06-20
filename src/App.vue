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
.main {
  padding: 0px !important;
  margin: 0px !important;
  /* width: 100vw;
  height: 100vh;
  background: blueviolet; */
}
</style>