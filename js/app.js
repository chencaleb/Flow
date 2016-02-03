var canvas = document.getElementById('myCanvas');
window.onload = function() {

var bounds = canvas.getBoundingClientRect();
//get reference to the drawing context
var ctx = canvas.getContext("2d");
var started = false;


function midPointBtw(p1, p2) {
  return {
    x: p1.x + (p2.x - p1.x) / 2,
    y: p1.y + (p2.y - p1.y) / 2
  };
}

ctx.lineWidth = 10;
ctx.lineJoin = ctx.lineCap = 'round';

var isDrawing, points = [ ];

myCanvas.onmousedown = function(e) {
  isDrawing = true;
  points.push({ x: e.clientX-bounds.left, y: e.clientY-bounds.top });
};

myCanvas.onmousemove = function(e) {
  if (!isDrawing) return;
  
  points.push({ x: e.clientX-bounds.left, y: e.clientY-bounds.top });

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
  var p1 = points[0];
  var p2 = points[1];
  
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  console.log(points);

  for (var i = 1, len = points.length; i < len; i++) {
    // we pick the point between pi+1 & pi+2 as the
    // end point and p1 as our control point
    var midPoint = midPointBtw(p1, p2);
    ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);
    p1 = points[i];
    p2 = points[i+1];
  }
  // Draw last line as a straight line while
  // we wait for the next point to be able to calculate
  // the bezier control point
  ctx.lineTo(p1.x, p1.y);
  ctx.stroke();
};

myCanvas.onmouseup = function() {
  isDrawing = false;
  points.length = 0;
};

// function fadeOut() {
//   context.fillStyle = "rgba(255,255,255,0.1)";
//   context.fillRect(0, 0, canvas.width, canvas.height);
//   setTimeout(fadeOut, 500);
// }

// canvas.addEventListener('mousemove', onMouseEvent, false);
// fadeOut();
};