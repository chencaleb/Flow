var canvas;
var ctx;
var bounds;
var requestAnimationFrame;
var mouseXPos;
var mouseYPos;
var isMouseDown;

window.onload = function() {
requestAnimationFrame = window.requestAnimationFrame || 
                        window.mozRequestAnimationFrame ||
                        window.webkitRequestAnimationFrame ||
                        window.msRequestAnimationFrame;

canvas = document.getElementById('myCanvas');
ctx = canvas.getContext("2d"); //get reference to the drawing context
bounds = canvas.getBoundingClientRect(); //get reference to bounds


//creates mouse input listeners
document.addEventListener("mousemove", mouseMoveFunction, false);
document.addEventListener("mousedown", mouseDownFunction, false);
document.addEventListener("mouseup", mouseUpFunction, false);

player = new Player();
};

function mouseMoveFunction(event) {
  mouseXPos = event.clientX - bounds.left;
  mouseYPos = event.clientY - bounds.top;
}

function mouseDownFunction(event) {
  isMouseDown = true;
}

function mouseUpFunction(event) {
  isMouseDown = false;
}

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