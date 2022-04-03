"use strict";

var ctx = gameCanvas.getContext("2d");
var x = [600, 600, 600, 600, 600];
var y = [0, 100, 200, 300, 400];
var speed = [-1, -2, -0.5, -1.2, -1.8];
var rocketY = 200,
  changeY = 0,
  score = 0;
let up = false,
  down = false;

var gameTimer = setInterval(mainloop, 20);
function mainloop() {
  moveMeteors();
  moveRocket();
}
function moveMeteors() {
  console.log("Move");
  ctx.clearRect(0, 0, 640, 480);
  for (var n = 0; n < 5; n++) {
    ctx.drawImage(meteor, x[n], y[n], 80, 80);
    x[n] += speed[n];
    checkForHits(n);
    if (x[n] < -80) {
      x[n] = 640;
      y[n] = Math.random() * 400;
    }
  }
}
function moveRocket() {
  if (changeY > 0 && rocketY < 410) rocketY += changeY;
  if (changeY < 0 && rocketY > 0) rocketY += changeY;
  ctx.drawImage(rocket, 0, rocketY, 80, 80);
  score++;
  ctx.fillStyle = "yellow";
  ctx.font = "30px arial";
  ctx.fillText("score: " + score, 10, 30);
}
document.onkeydown = keyPressed;
function keyPressed(e) {
  var k = e.keyCode;
  if (k == 87) {
    up = true;
  }
  if (k == 83) {
    down = true;
  }

  changeY = up && down ? 0 : up ? -3 : 3;
}
document.onkeyup = keyUnPressed;
function keyUnPressed(e) {
  var k = e.keyCode;
  if (k == 87) {
    up = false;
  }
  if (k == 83) {
    down = false;
  }
  changeY = !up && !down ? 0 : up ? -3 : 3;
}

function checkForHits(n) {
  if (Math.abs(x[n] < 50) && Math.abs(rocketY - y[n]) < 50) {
    clearInterval(gameTimer);
    ctx.font = "80px Arial";
    ctx.fillText("Game Error", 100, 250);
  }
}
