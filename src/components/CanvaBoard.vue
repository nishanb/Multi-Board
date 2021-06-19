<template>
  <div>
    <canvas
      ref="board"
      width="800"
      height="800"
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
export default {
  computed: {
    ...mapState(["canvas", "isDrawing", "brushColor", "storkeSize", "x", "y"]),
  },
  methods: {
    drawLine(x1, y1, x2, y2, ctx = this.canvas) {
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
      var gridSize = 10;
      this.canvas.fillStyle = "rgba(0, 0, 0, .5)";

      for (var i = 0; i * gridSize < 800; i++) {
        for (var j = 0; j * gridSize < 800; j++) {
          if (i > 0 && j > 0) {
            this.canvas.beginPath();
            this.canvas.rect(i * gridSize, j * gridSize, 1, 1);
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
    ...mapActions(["setWhiteBoard", "setX", "setY", "setDrawState", "addPath"]),
  },
  mounted() {
    this.setWhiteBoard(this.$refs["board"].getContext("2d"));
    this.setBackground();
  },
};
</script>

<style scoped>
canvas {
  background: #ffff;
  margin: 10px;
}
</style>