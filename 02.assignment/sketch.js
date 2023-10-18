// Target rush
// Nohl
// Date
//
// Extra for Experts:
// Made a line function that the cannonball follows based on where the mouse was clicked, used atan2, cos, sin, to make a cannon that points towards
// the players curser, added collision to see if the cannball hits the targets, also used srokeWeight to make the cannon a actual cannon, 
// used splice to take out a spicific thing in the array instead of just off the end of the array.


let bar = [0,255,0];
let font;
let mode = 1;
let targetdelay = 1000;
let lastTarget = 0;
let targets = [];
let time = 30;
let target;
let ball;
let balls = [];
let Sx;
let Sy;
let field;
let backgroundSound;
let vicSound;
let scalor;
let start;
let gametime;
let started = 30000
let targetsHit = 0


function preload(){
  field = loadImage("country field.png");
  vicSound = loadSound("victorySound.mp3");
  backgroundSound = loadSound("background_music_loop.mp3");
  backgroundSound.setVolume(0.5);
  vicSound.setVolume(1.0);
  font = loadFont("Fridge.ttf")
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  start = {
    titleX: width/9,
    titleY: height/9,
    x: width/8,
    y: height/9 * 4,
    width: width/9 * 7,
    height: height/10 * 3
  }  
}

function draw() {
  background(0,200,0);  
  startScreen();
  game();

  if(mode === 2){
    makeTargets();
    moveTargets();
    moveBall();
    drawCannon();
    collision();
  }

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
  if(mode === 1){
    if(mouseX >= start.x && mouseX <= start.x + start.width && mouseY >= start.y && mouseY <= start.y + start.height){
      mode = 2
      started = millis()
    }
  }

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
        targetsHit ++;
      }
    }
  }
}

function startScreen(){
  if (mode === 1){
    fill(0);
    textFont(font);
    textAlign(CENTER, CENTER);
    textSize(start.height * 0.7);
    text("TARGET SHOOTING", start.titleX, start.titleY, start.width, start.height);
    textSize(start.height);
    
    fill(bar);
    rect(start.x, start.y, start.width, start.height);

    fill(0);
    text("START", start.x, start.y, start.width, start.height);

    if(mouseX >= start.x && mouseX <= start.x + start.width && mouseY >= start.y && mouseY <= start.y + start.height){
      bar = [0,150,0];
    }
    else{
      bar = [0,255,0];
    }

    if (mode ===2){
      image(field, 0,0,width,height);
    }

  }
}


function game(){
  if (millis() > gametime + started){
    mode = 3;
  }
  fill(0)
  textSize(width/20);
  textAlign(LEFT, BOTTOM);
  text(concat("Time: ", str(30 - round(millis - started))),0 + width/30, 0);
  
  textAlign(RIGHT, BOTTOM);
  text(concat("Points: ", str(targetsHit)), width- width / 30, height);
}

