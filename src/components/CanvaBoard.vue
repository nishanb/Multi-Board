<template>
  <div>
    <canvas
      ref="board"
      width="600"
      height="600"
      @mousemove="draw"
      @mousedown="startDraw"
      @mouseup="endDraw"
      @mouseleave="endDraw"
    >
    </canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      canvas: null,
      isDrawing: false,
      x: null,
      y: null,
      brushColor: "#d4f713",
      storkeSize: 5,
      sboard: null,
    };
  },
  mounted() {
    this.canvas = this.$refs["board"].getContext("2d");
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
    },
    draw(e) {
      if (this.isDrawing) {
        this.drawLine(this.x, this.y, e.offsetX, e.offsetY);
        this.x = e.offsetX;
        this.y = e.offsetY;
      }
    },
    startDraw(e) {
      this.x = e.offsetX;
      this.y = e.offsetY;
      this.isDrawing = true;
    },
    endDraw() {
      this.isDrawing = false;
    },
  },
};
</script>

<style scoped>
canvas {
  background: rgb(64, 179, 163);
  margin: 10px;
}
</style>