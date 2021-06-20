module.exports = {
    setBackground : (canvas)  => {
        var gridSize = 20;
        canvas.fillStyle = "rgba(49, 179, 220)";
        for (var i = 0; i * gridSize < 10000; i++) {
          for (var j = 0; j * gridSize < 10000; j++) {
            if (i > 0 && j > 0) {
              canvas.beginPath();
              canvas.rect(i * gridSize, j * gridSize, 2, 2);
              canvas.fill();
              canvas.closePath();
            }
          }
        }
    },
    clearBackground : (canvas) => {
        canvas.clearRect(0, 0, 800, 800);
    },
    createLine: (ctx) =>  {
        ctx.canvas.beginPath();
        ctx.canvas.strokeStyle = ctx.brushColor;
        ctx.canvas.lineWidth = ctx.storkeSize;
        ctx.canvas.moveTo(ctx.x1, ctx.y1);
        ctx.canvas.lineTo(ctx.x2, ctx.y2);
        ctx.canvas.stroke();
        ctx.canvas.closePath();
    }
}
