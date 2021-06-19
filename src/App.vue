<template>
  <div>
    <CanvaBoard />
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