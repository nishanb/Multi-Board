module.exports = {
    setBackground : (canvas)  => {
        var gridSize = 20;
        canvas.fillStyle = "rgba(f, f, f)";
        for (var i = 0; i * gridSize < canvas.canvas.clientWidth; i++) {
          for (var j = 0; j * gridSize < canvas.canvas.clientHeight; j++) {
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
        if(ctx.secondary){
          ctx.x1 *= (ctx.currentWidth/ctx.width)
          ctx.x2 *= (ctx.currentWidth/ctx.width)
          ctx.y2 *= (ctx.currentHeight/ctx.height)
          ctx.y1 *= (ctx.currentHeight/ctx.height)
        }
        ctx.canvas.beginPath();
        ctx.canvas.strokeStyle = ctx.brushColor;
        ctx.canvas.lineWidth = ctx.storkeSize;
        ctx.canvas.moveTo(ctx.x1, ctx.y1);
        ctx.canvas.lineTo(ctx.x2, ctx.y2);
        ctx.canvas.stroke();
        ctx.canvas.closePath();
    }
}
