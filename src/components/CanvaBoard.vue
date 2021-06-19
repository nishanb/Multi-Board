<template>
  <div>
    <canvas
      ref="board"
      width="800"
      height="600"
      @mousemove="draw"
      @mousedown="startDraw"
      @mouseup="endDraw"
      @mouseleave="endDraw"
    >
    </canvas>
    <button @click="clear">clear</button>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import SocketIO from "socket.io-client";

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
    drawLine(x1, y1, x2, y2, ctx = this.canvas, secondary = false) {
      ctx.beginPath();
      ctx.strokeStyle = this.brushColor;
      ctx.lineWidth = this.storkeSize;
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.closePath();
      this.addPath({
        x1,
        y1,
        x2,
        y2,
        brushColor: this.brushColor,
        lineWidth: this.lineWidth,
        secondary,
      });
    },
    draw(e) {
      if (this.isDrawing) {
        this.drawLine(this.x, this.y, e.offsetX, e.offsetY);
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
    setBackground() {
      var gridSize = 20;
      this.canvas.fillStyle = "rgba(49, 179, 220)";

      for (var i = 0; i * gridSize < 800; i++) {
        for (var j = 0; j * gridSize < 600; j++) {
          if (i > 0 && j > 0) {
            this.canvas.beginPath();
            this.canvas.rect(i * gridSize, j * gridSize, 2, 2);
            this.canvas.fill();
            this.canvas.closePath();
          }
        }
      }
    },
    clear() {
      this.canvas.clearRect(0, 0, 800, 800);
      this.setBackground();
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
    this.setBackground();
    this.setSocketConnection(SocketIO("http://localhost:8080"));
    this.webSoc.on("addPoint", (point) => {
      console.log("message from " + point["sender"]);
      this.drawLine(
        point["x1"],
        point["y1"],
        point["x2"],
        point["y2"],
        this.canvas,
        true
      );
    });
  },
};
</script>

<style scoped>
canvas {
  background: #ffff;
  margin: 10px;
}
</style>