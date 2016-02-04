var canvas = document.getElementById('myCanvas');
var bounds = canvas.getBoundingClientRect(); //get reference to bounds
var ctx = canvas.getContext("2d"); //get reference to the drawing context
var requestAnimationFrame = window.requestAnimationFrame || 
                            window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame ||
                            window.msRequestAnimationFrame;

window.onload = function() {

var circles = new Array();

//circle constructor
function Circle(radius, speed, width, xPos, yPos) {
  this.radius = radius;
  this.speed = speed;
  this.width = width;
  this.xPos = xPos;
  this.yPos = yPos;

  this.counter = 0;

  var signHelper = Math.random();

  if(signHelper > 0.5) {
    this.sign = -1;
  } else {
    this.sign = 1;
  }
}

//circle object methods
Circle.prototype.update = function() {
  this.counter += this.sign * this.speed;
  ctx.beginPath();
  ctx.arc(this.xPos + Math.cos(this.counter / 100) * this.radius,
          this.yPos + Math.sin(this.counter / 100) * this.radius,
          this.width,
          0,
          Math.PI * 2,
          false);
  ctx.closePath();
  ctx.fillStyle = 'rgb(0, 0, 0)';
  ctx.fill();
};


//makes the circles
function createCircles() {
  for (var i=0; i<200; i++) {
    var randomX = Math.round(-200 + Math.random() * 1000);
    var randomY = Math.round(-200 + Math.random() * 800);
    var speed = 0.2 + Math.random() * 3;
    var size = 5;

    var circle = new Circle(100, speed, size, randomX, randomY);
    circles.push(circle);
  }
  draw();
}
createCircles();

function draw() {
  ctx.clearRect(0, 0, 800, 600); //overwrites pointer
  for(var i=0; i<circles.length; i++) {
    var myCircle = circles[i];
    myCircle.update();
  }
  requestAnimationFrame(draw);
}


//line properties
ctx.lineWidth = 7;
ctx.lineJoin = ctx.lineCap = 'round';
ctx.shadowBlur = 7;
ctx.shadowColor = 'rgb(255, 255, 255)';

var isDrawing, points = [ ];

//finds midpoint between two points
function findMidpoint(p1, p2) {
  return {
    x: p1.x + (p2.x - p1.x) / 2,
    y: p1.y + (p2.y - p1.y) / 2
  };
}

//mouse events
myCanvas.onmousedown = function(e) {
  isDrawing = true;
  points.push({ x: e.clientX-bounds.left, y: e.clientY-bounds.top });
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

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
    var midPoint = findMidpoint(p1, p2);
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