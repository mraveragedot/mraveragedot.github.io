// Target rush
// Nohl
// Date
//
// Extra for Experts:
// Made a line function that the cannonball follows based on where the mouse was clicked, used atan2, cos, sin, to make a cannon that points towards
// the players curser, added collision to see if the cannball hits the targets, also used srokeWeight to make the cannon a actual cannon, 
// used splice to take out a spicific thing in the array instead of just off the end of the array.

let targetdelay = 1000;
let lastTarget = 0;
let targets = [];
let time = 30;
let target;
let ball;
let balls = [];
let Sx;
let Sy;


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  makeTargets();
  moveTargets();
  moveBall();
  drawCannon();
  collision();

}

function makeTargets(){
  if (millis() > lastTarget + targetdelay){
    target = {
      x: random(0,50.001),
      y: height/12,
      speed: random(3, 7),
      diameter: random(55,60),
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

      //getting rid of targets
      if (targets[i].x > width + targets[i].diameter || targets[i].x < 0 - targets[i].diameter){
        targets.splice(i, 1);
      }
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
    y: Sy,
    size: 20,
    speed: 20
  };
  ball.slope = (ball.My-Sy)/(ball.Mx-Sx);
  ball.b = (ball.slope*ball.Mx-ball.My)*-1;
  ball.x = (Sy-ball.b)/ball.slope;
  balls.push(ball);
}

function moveBall(){
  fill("red");
  for(let i = 0;i < balls.length;i ++){
    circle(balls[i].x,balls[i].y,balls[i].size);
    balls[i].y -= balls[i].speed;
    balls[i].x = (balls[i].y-balls[i].b)/balls[i].slope;

    //get rid of balls
    if (balls[i].x > width || balls[i].x < 0 || balls[i].y < 0){
      balls.splice(i,1);
    }
  }
  //console.log(balls)
}

function drawCannon(){
  strokeWeight(20);
  let a = atan2(mouseY - height, mouseX - width/2);
  Sx = width/2 + 80 * cos(-a);
  Sy = height - 80 * sin(-a);
  line(width/2, height, Sx ,Sy );
  strokeWeight(1);
}

function collision(){
  for (let i = 0;i < balls.length;i++){
    for(let n = 0;n < targets.length; n ++){
      if(dist(balls[i].x, balls[i].y, targets[n].x, targets[n].y) <= balls[i].size/2 + targets[n].diameter/2){
        targets.splice(n,1);
        console.log(true);
      }
    }
  }
}