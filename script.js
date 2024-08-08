const canvas = document.querySelector("#draw");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = "#BADA55";
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 100;

let isDrawing = false;
let LastX = 0;
let LastY = 0;
let hue = 0;
let direction = true;

function draw(e) {
  if (!isDrawing) return;

  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.beginPath();
  ctx.moveTo(LastX, LastY);

  //* PC O MOBILE
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    ctx.lineTo(e.touches[0].clientX, e.touches[0].clientY);
  } else {
    ctx.lineTo(e.offsetX, e.offsetY);
  }
  
  ctx.stroke();
  //* PC O MOBILE
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    [LastX, LastY] = [e.touches[0].clientX, e.touches[0].clientY];
  } else {
    [LastX, LastY] = [e.offsetX, e.offsetY];
  }

  hue++;
  if (hue >= 360) {
    hue = 0;
  }
  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
    direction = !direction;
  }
  if (direction) {
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--;
  }
}

//* PC
canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  [LastX, LastY] = [e.offsetX, e.offsetY];
});
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));

//*MOBILE
canvas.addEventListener("touchstart", (e) => {
  isDrawing = true;
  [LastX, LastY] = [e.touches[0].clientX, e.touches[0].clientY];
});
canvas.addEventListener("touchmove", draw);
canvas.addEventListener("touchcancel", () => (isDrawing = false));
canvas.addEventListener("touchend", () => (isDrawing = false));