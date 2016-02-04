var canvas;
var ctx;
var bounds;
var requestAnimationFrame;

var mouseXPos;
var mouseYPos;

var startButton;
var isMouseDown = false;
var hasStarted = false;


var enemies;
var circles;

var speed = {x: -1.3, y: 1};


window.onload = function() {
requestAnimationFrame = window.requestAnimationFrame || 
                        window.mozRequestAnimationFrame ||
                        window.webkitRequestAnimationFrame ||
                        window.msRequestAnimationFrame;

canvas = document.getElementById('myCanvas');
ctx = canvas.getContext("2d"); //get reference to the drawing context
bounds = canvas.getBoundingClientRect(); //get reference to bounds
startButton = document.getElementById("startButton");

//creates mouse input listeners
document.addEventListener("mousemove", mouseMoveFunction, false);
document.addEventListener("mousedown", mouseDownFunction, false);
document.addEventListener("mouseup", mouseUpFunction, false);
startButton.addEventListener("click", startButtonFunction, false);
player = new Player();

};

function startButtonFunction(event) {
  event.preventDefault();

  if(hasStarted === false) {
    hasStarted = true;

    circles = [];

    player.position.x = mouseXPos;
    player.position.y = mouseYPos;
  }
}

function mouseMoveFunction(event) {
  mouseXPos = event.clientX - bounds.left;
  mouseYPos = event.clientY - bounds.top;
}

function mouseDownFunction(event) {
  isMouseDown = true;
  console.log(mouseXPos, mouseYPos);
}

function mouseUpFunction(event) {
  isMouseDown = false;
}

//create circle objects
function createCircles(position, n) {
  var temp = 10 + (Math.random() * 15);

  while(--temp >=0) {
    var circle = new Circle();
    circle.position.x = position.x + (Math.sin(temp) * n);
    circle.position.y = position.y + (Math.cos(temp) * n);
    p.speed = {x: -4 + Math.random() * 8, y: -4 + Math.random() * 8};

    circles.push(circle);
  }
}




//Write functions that gives the attributes for:
function Coordinates(x, y) {
  this.position = {x: x, y: y};
}

//calculate distance between points
Coordinates.prototype.distanceTo = function(c) {
  var distX = c.x-this.position.x;
  var distY = p.y=this.position.y;
  return Math.sqrt(distX^2 + distY^2);
};

//player
function Player() {
  this.position = {x: 0, y: 0};
}
Player.prototype = new Coordinates();

//enemy
function Enemy() {
  this.position = {x: 0, y: 0};
}
Enemy.prototype = new Coordinates();

//circles
function Circle() {
  this.position = {x: 0, y: 0};
  this.color = "red";
}
Circle.prototype = new Coordinates();

function evaluator() {
  clearRect(0, 0, canvas.width, canvas.height);


}

//if game has started (mousedown/mousemove)
//keep track of mouse position























// //circle constructor
// function Circle(radius, speed, width, xPos, yPos) {
//   this.radius = radius;
//   this.speed = speed;
//   this.width = width;
//   this.xPos = xPos;
//   this.yPos = yPos;

//   this.counter = 0;

//   var signHelper = Math.random();

//   if(signHelper > 0.5) {
//     this.sign = -1;
//   } else {
//     this.sign = 1;
//   }
// }

// //circle object methods
// Circle.prototype.update = function() {
//   this.counter += this.sign * this.speed;
//   ctx.beginPath();
//   ctx.arc(this.xPos + Math.cos(this.counter / 100) * this.radius,
//           this.yPos + Math.sin(this.counter / 100) * this.radius,
//           this.width,
//           0,
//           Math.PI * 2,
//           false);
//   ctx.closePath();
//   ctx.fillStyle = 'rgb(0, 0, 0)';
//   ctx.fill();
// };


//makes the circles
// function createCircles() {
//   for (var i=0; i<200; i++) {
//     var randomX = Math.round(-200 + Math.random() * 1000);
//     var randomY = Math.round(-200 + Math.random() * 800);
//     var speed = 0.2 + Math.random() * 3;
//     var size = 5;

//     var circle = new Circle(100, speed, size, randomX, randomY);
//     circles.push(circle);
//   }
//   draw();
// }
// createCircles();

// function draw() {
//   ctx.clearRect(0, 0, 800, 600); //overwrites pointer
//   for(var i=0; i<circles.length; i++) {
//     var myCircle = circles[i];
//     myCircle.update();
//   }
//   requestAnimationFrame(draw);
// }