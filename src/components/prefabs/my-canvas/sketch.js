/*
const sketch = () => {
  let c = document.createElement('canvas');
  c.id = 'sketch';
  c.width = 48;
  c.height = 48;

  let context = c.getContext('2d');
  context.beginPath();
  context.rect(0, 0, 48, 48);
  context.fillStyle = 'yellow';
  context.fill();
  context.lineWidth = 7;
  context.strokeStyle = 'black';
  context.stroke();

  return c;
};

export default sketch;

*/
const sketch = () => {
  window.requestAnimFrame = (function(callback) {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(callback) {
        window.setTimeout(callback, 1000 / 60);
      }
    );
  })();

  function drawRectangle(myRectangle, context) {
    context.beginPath();
    context.rect(
      myRectangle.x,
      myRectangle.y,
      myRectangle.width,
      myRectangle.height
    );
    context.fillStyle = '#8ED6FF';
    context.fill();
    context.lineWidth = myRectangle.borderWidth;
    context.strokeStyle = 'black';
    context.stroke();
  }

  function animate(myRectangle, canvas, context, startTime) {
    // update
    var time = new Date().getTime() - startTime;

    var linearSpeed = 100;
    // pixels / second
    var newX = (linearSpeed * time) / 1000;

    if (newX < canvas.width - myRectangle.width - myRectangle.borderWidth / 2) {
      myRectangle.x = newX;
    }

    // clear
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawRectangle(myRectangle, context);

    // request new frame
    requestAnimFrame(function() {
      animate(myRectangle, canvas, context, startTime);
    });
  }

  //var canvas = document.getElementById('sketch');
  var canvas = document.createElement('canvas');
  canvas.id = 'sketch';
  canvas.width = 600;
  canvas.height = 200;

  var context = canvas.getContext('2d');

  var myRectangle = {
    x: 0,
    y: 75,
    width: 100,
    height: 50,
    borderWidth: 5
  };

  drawRectangle(myRectangle, context);

  // wait one second before starting animation
  setTimeout(function() {
    var startTime = new Date().getTime();
    animate(myRectangle, canvas, context, startTime);
  }, 1000);

  return canvas;
};

export default sketch;
