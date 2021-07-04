<template>
  <div>
    <canvas
      ref="board"
      @mousemove="draw"
      @mousedown="startDraw"
      @mouseup="endDraw"
      @mouseleave="endDraw"
    >
    </canvas>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import SocketIO from "socket.io-client";
import * as cHelper from "../services/canvasHelper";

export default {
  computed: {
    ...mapState([
      "canvas",
      "isDrawing",
      "brushColor",
      "storkeSize",
      "x",
      "y",
      "webSoc",
    ]),
  },
  methods: {
    drawLine(point) {
      //draw line in canvas
      cHelper.createLine({ ...point, canvas: this.canvas });

      //send new points to ws
      this.addPath({ ...point });
    },
    draw(e) {
      if (this.isDrawing) {
        this.drawLine({
          x1: this.x,
          y1: this.y,
          x2: e.offsetX,
          y2: e.offsetY,
          secondary: false,
          brushColor: this.brushColor,
          storkeSize: this.storkeSize,
        });
        this.setX(e.offsetX);
        this.setY(e.offsetY);
      }
    },
    startDraw(e) {
      this.setDrawState(true);
      this.setX(e.offsetX);
      this.setY(e.offsetY);
    },
    endDraw() {
      this.setDrawState(false);
    },
    clear() {
      cHelper.clearBackground(this.canvas);
      cHelper.setBackground(this.canvas);
    },
    ...mapActions([
      "setWhiteBoard",
      "setX",
      "setY",
      "setDrawState",
      "addPath",
      "setSocketConnection",
    ]),
    drawBackground() {
      this.$refs["board"].width = this.$windowWidth;
      this.$refs["board"].height = this.$windowHeight;

      cHelper.setBackground(this.canvas);
    },
  },
  mounted() {
    this.setWhiteBoard(this.$refs["board"].getContext("2d"));

    this.drawBackground();

    //setup websocket client
    this.setSocketConnection(SocketIO("http://192.168.0.167:8080"));

    //listen to add point from othetr clients
    this.webSoc.on("addPoint", (point) => {
      console.log("message from " + point["sender"]);
      this.drawLine({ ...point, secondary: true });
    });
  },
  created() {
    window.addEventListener("resize", () => {
      try {
        this.drawBackground();
      } catch (error) {
        console.log(error);
      }
    });
  },
};
</script>

<style scoped>
</style>