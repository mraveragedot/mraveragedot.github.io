// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let targetdelay = 1000;
let lastTarget = 0;
let targets = [];
let time = 30;
let target;
let ball;
let balls = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  makeTargets();
  moveTargets();
  moveBall();
  drawCannon();

}

function makeTargets(){
  if (millis() > lastTarget + targetdelay){
    target = {
      x: random(0,50.001),
      y: height/12,
      speed: random(5,10),
      diameter: random(35,40),
      colour: ["blue", "red", "yellow"],
    };
    if (target.x <= 25){
      target.x = 0 - target.diameter/2;
    }
    else{
      target.x = width + target.diameter/2;
      target.speed = target.speed * -1;
      target.y += target.diameter + 5;
    }
    targets.push(target);
    lastTarget = millis();
    time -= 1;
  }
}

function moveTargets(){
  if (targets.length !== 0){
    for(let i = 0; i < targets.length - 1; i ++){
      fill(targets[i].colour[0]);
      circle(targets[i].x, targets[i].y, targets[i].diameter);
      fill(targets[i].colour[1]);
      circle(targets[i].x, targets[i].y, targets[i].diameter * (2/3));
      fill(targets[i].colour[2]);
      circle(targets[i].x, targets[i].y, targets[i].diameter/3);
      targets[i].x += targets[i].speed;
    }
  }

}

function mouseClicked(){
  spawnBall();
}

function spawnBall(){
  let ball = {
    Mx: mouseX,
    My: mouseY,
    Sx: width/2,
    Sy: height,
    y: height,
    size: 20,
  }
  ball.slope = (ball.My-ball.Sy)/(ball.Mx-ball.Sx);
  ball.b = (ball.slope*ball.Mx-ball.My)*-1;
  ball.x = (ball.Sy-ball.b)/ball.slope;
  balls.push(ball)
}

function moveBall(){
  for(let i = 0;i < balls.length;i ++){
    circle(balls[i].x,balls[i].y,balls[i].size);
  balls[i].y -= 10;
  balls[i].x = (balls[i].y-balls[i].b)/balls[i].slope;

  }
  //console.log(balls)
}

function drawCannon(){
  //calculating angle
  let a = atan2(mouseY - height, mouseX - width/2);
  line(width/2, height, width/2 - 80 * sin(a), height - 80 * cos(a));
}