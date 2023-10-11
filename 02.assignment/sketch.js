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


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  makeTargets();
  moveTargets();
  shoot();
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
    console.log(target.x)
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

function shoot(){
  strokeWeight(50);
  let cannonX = dist(width/2, mouseX);
  console.log(cannonX);
  let cannonY = dist(height, mouseY);
  console.log(cannonY);
  line(width/2, height, mouseX + -1 * cannonX + 20, mouseY + -1 * cannonY + 20);


  strokeWeight(1);
}