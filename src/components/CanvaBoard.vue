<template>
  <div>
    <canvas
      ref="board"
      width="560"
      height="360"
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
    };
  },
  mounted() {
    this.canvas = this.$refs["board"].getContext("2d");
  },
  methods: {
    drawLine(x1, y1, x2, y2) {
      let ctx = this.canvas;
      ctx.beginPath();
      ctx.strokeStyle = "blue";
      ctx.lineWidth = 5;
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
      ctx.closePath();
      console.log(x1, y1, x2, y2);
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
    endDraw(e) {
      if (this.isDrawing) {
        this.drawLine(this.x, this.y, e.offsetX, e.offsetY);
        this.x = 0;
        this.y = 0;
        this.isDrawing = false;
      }
    },
  },
};
</script>

<style  scoped>
canvas {
  background: rgb(64, 179, 163);
}
</style>