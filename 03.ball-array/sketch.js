// ball object notation
// Your Name
// oct 5
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let ballArray = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
  let theBall = spawnBall();
  ballArray.push(theBall);
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
  for (let i = 0; i < ballArray.length; i ++){
    let theBall = ballArray[i];
    fill(theBall.r, theBall.g, theBall.b);
    circle(theBall.x, theBall.y, theBall.radius * 2);
  }
}

function moveBall(){
  for(let i = 0; i < ballArray.length; i++){
    let theBall = ballArray[i];
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
  }
}

function keyTyped(){
  if (key === " "){
    let someBall = spawnBall();
    ballArray.push(someBall);
  }
}

function mouseClicked(){
  let someBall = spawnBall();
  someBall.x = mouseX;
  someBall.y = mouseY;
  ballArray.push(someBall);
}

