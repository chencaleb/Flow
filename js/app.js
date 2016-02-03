var canvas = document.getElementById('myCanvas');
window.onload = function() {

var bounds = canvas.getBoundingClientRect();
//get reference to the drawing context
var context = canvas.getContext("2d");
var started = false;


function onMouseEvent(event) {
  var x, y;
  
  x = event.clientX - bounds.left;
  y = event.clientY - bounds.top;
  
  console.log("The position of your mouse is at " + x + " , " + y + ".");

  if (!started) {
    context.beginPath();
    context.moveTo(x, y);
    started = true;
  }else {
    context.lineTo(x, y);
    context.stroke();
  }

}


canvas.addEventListener('mousemove', onMouseEvent, false);

};
    // Capture the Window X & Y coordinates of the mouse cursor
 
    // var started = false; 


    // var bounds = canvas.getBoundingClientRect();

    // var mouse = {
    //   x: event.clientX = bounds.left,
    //   y: event.clientY = bounds.top
    // };
    // console.log("The position of your mouse is at " + x + " , " + y + ".");