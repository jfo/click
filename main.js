const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drawOnCanvas();
  console.log(canvas);
}

function drawOnCanvas() {
  ctx.fillStyle = "rgba(150, 150, 255, 0.5)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);
