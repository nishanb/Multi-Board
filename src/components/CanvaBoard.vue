<template>
  <div>
    <canvas
      ref="board"
      @mousemove="draw"
      @mousedown="startDraw"
      @mouseup="endDraw"
      @mouseleave="endDraw"
      height="800"
      width="800"
    >
    </canvas>
    <button @click="clear">clear</button>
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
  },
  mounted() {
    this.setWhiteBoard(this.$refs["board"].getContext("2d"));
    cHelper.setBackground(this.canvas);

    //setup websocket client
    this.setSocketConnection(SocketIO("http://192.168.0.167:8080"));

    //listen to add point from othetr clients
    this.webSoc.on("addPoint", (point) => {
      console.log("message from " + point["sender"]);
      this.drawLine({ ...point, secondary: true });
    });
  },
};
</script>

<style scoped>
canvas {
  border: 1px solid rgb(9, 9, 14);
  display: block;
}
</style>