var requestAnimationFrame;
var canvas;
var ctx;

var bounds;
var mouseXPos;
var mouseYPos;

var startButton;
var isMouseDown = false;
var hasStarted = false;

var player;
var enemies = [];
var circles = [];

var speed = {x: -2, y: 1.5};
var time = 0;

window.onload = function() {
requestAnimationFrame = window.requestAnimationFrame || 
                        window.mozRequestAnimationFrame ||
                        window.webkitRequestAnimationFrame ||
                        window.msRequestAnimationFrame;

canvas = document.getElementById('myCanvas');
ctx = canvas.getContext("2d"); //get reference to the drawing context
bounds = canvas.getBoundingClientRect(); //get reference to bounds
startButton = document.getElementById("startButton");
timer = document.getElementById("timer");
//creates mouse input listeners
document.addEventListener("mousemove", mouseMoveFunction, false);
document.addEventListener("mousedown", mouseDownFunction, false);
document.addEventListener("mouseup", mouseUpFunction, false);
startButton.addEventListener("click", startButtonFunction, false);

player = new Player();

setInterval(evaluator, 1000 / 60);
};

function startButtonFunction(event) {
  event.preventDefault();

  if(hasStarted === false) {
    hasStarted = true;
    var aud = document.getElementById("song");
    aud.load();
    aud.play();
    aud.volume = 0.5;
    aud.loop = true; 

    rules.style.display = "none";
    gg.innerHTML = "";
    enemies = [];
    player.userPiece = [];
    
    player.position.x = mouseXPos;
    player.position.y = mouseYPos;

    time = new Date().getTime();
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

function gameOver() {
  hasStarted = false;
  rules.style.display="block";
  gg.innerHTML = "Game Over!!";
}
//Keeps track of current positions
function Coordinates(x, y) {
  this.position = {x: x, y: y};
}

//calculate distance between points
Coordinates.prototype.distanceTo = function(circle) {
  var distX = circle.x-this.position.x;
  var distY = circle.y=this.position.y;
  return Math.sqrt(distX^2 + distY^2);
};

//player attributes
function Player() {
  this.position = {x: 0, y: 0};
  this.size = 8;
  this.userPiece = [];
}
Player.prototype = new Coordinates();

//enemy attributes
function Enemy() {
  this.position = {x: 0, y: 0};
  this.size = 6 + (Math.random() * 5);
  this.movement = 1 + (Math.random() * 0.75);
}
Enemy.prototype = new Coordinates();

function evaluator() {
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  var i;
  
  if(hasStarted) {

    //This adjusts the delay of the mouse. Increasing the multipler will decrease delay.
    player.position.x += (mouseXPos - player.position.x) * 0.5;
    player.position.y += (mouseYPos - player.position.y) * 0.5;

    player.userPiece.push(new Coordinates(player.position.x, player.position.y));

    //draws the tail
    ctx.beginPath();
    ctx.strokeStyle = "darkgrey";
    ctx.lineWidth = 3;
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'rgb(255, 255, 255)';

    for(i=0; i<player.userPiece.length; i++) {
      circle = player.userPiece[i];
      ctx.lineTo(circle.position.x, circle.position.y);
      circle.position.x += speed.x;
      circle.position.y += speed.y;
    }

    ctx.stroke();
    ctx.closePath();
  
    //Ensures that the length of the array never exceeds 35
    if(player.userPiece.length > 50) {
      player.userPiece.shift();
    }
    
    //draws the head
    ctx.beginPath();
    ctx.fillStyle = "darkgrey";
    ctx.arc(player.position.x, player.position.y, 5, 0, Math.PI*2, true);
    ctx.fill();

  }

  //Player loses if he leaves the bounds of the screen
  if(hasStarted && (player.position.x < 0 || player.position.y < 0 ||
                    player.position.x > canvas.width || player.position.y > canvas.height)) {
    gameOver();
  }



  //Creates enemies
  for(i=0; i < enemies.length; i++) {
    circle = enemies[i];

    //Checks for collisions
    // if(hasStarted) {
    //   if(circle.distanceTo(player.position) < (player.size + circle.size)/5) {
    //      gameOver();
    //   }
    // }

    //Enemy movement
    ctx.beginPath();
    ctx.fillStyle = "#7DCDE8";
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'rgb(255, 255, 255)';
    ctx.arc(circle.position.x, circle.position.y, circle.size/2, 0, Math.PI*2, true);
    ctx.fill();

    circle.position.x += speed.x * circle.movement;
    circle.position.y += speed.y * circle.movement;

    if(circle.position.x < 0 || circle.position.y > canvas.height) {
      enemies.splice(i, 1);
      i--;
    } 
  }

  //Continues to generate enemies as they leave canvas
  if(enemies.length < 70) {
    enemies.push(randomizeCircle(new Enemy()));
  }

  if(hasStarted) {
    counter = "Time: <span>" + Math.floor(((new Date().getTime() - time) / 1000 ) * 100) / 100 + "</span>";
    timer.innerHTML = counter;
  }
}


//Generates a position for new enemies
function randomizeCircle(circle) {
  if(Math.random() > 0.5) {
    circle.position.x = Math.random() * canvas.width;
    circle.position.y = 0;
  } else {
    circle.position.x = canvas.width;
    circle.position.y = (-canvas.height *0.2) + (Math.random() * canvas.height);
  }

  return circle;
}