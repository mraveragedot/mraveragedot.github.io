// ball object notation
// Your Name
// oct 5
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let theBall;
let balls = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  theBall = spawnBall();
}

function draw() {
  background(220);
  moveBall();
  displayBall();
}

function spawnBall(){
  let theBall = {
    x: random(width),
    y: random(height),
    radius: random(15,30),
    r: random(255),
    g: random(255),
    b: random(255),
    dx: random(-5, 5),
    dy: random(-5, 5),
  };
  return theBall;
}

function displayBall() {
  fill(theBall.r, theBall.g, theBall.b);
  circle(theBall.x, theBall.y, theBall.radius * 2);
}

function moveBall(){
  theBall.x += theBall.dx;
  theBall.y += theBall.dy;
  if(theBall.x > width + theBall.radius){
    theBall.x = 0 - theBall.radius;
  }
  if(theBall.y > height + theBall.radius){
    theBall.y = 0 - theBall.radius;
  }
  if(theBall.x < 0 - theBall.radius){
    theBall.x = width + theBall.radius;
  }
  if(theBall.y < 0 - theBall.radius){
    theBall.y = height + theBall.radius;
  }

  console.log(theBall.x, theBall.y);
}

function KeyTyped(){
  if (key === " "){
    theBall = spawnBall();
  }
}

function mouseClicked(){
  append(balls, theBall);
}