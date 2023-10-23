// terrain gen
//oct 23

let time;
let terrain = [];
let xOFFset = 0;
let characterScale = 10
let grimbo;
let characterSpot = 50
let speed = 100

function preload(){
  grimbo = loadImage("grimbo.png");

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  spawnRectangles();
}

function draw() {
  background(220);
  if (keyIsDown(RIGHT_ARROW)){
    if (xOFFset + width < terrain.length - speed){
      xOFFset += speed;
    }
  }

  if(keyIsDown(LEFT_ARROW)){
    if (xOFFset > speed){
      xOFFset -= speed;
    }
  }
  
  displayRectangles();
  // moveCharacter();
}

function spawnRectangles(){
  time = 0;
  for (let x = 0; x < 10000; x++){
    let h = noise(time) * height;
    let thisRect = {
      x: x,
      height: h,
    };
    terrain.push(thisRect);
    time += 0.001;
  }
}

function displayRectangles(){
  for(let i = xOFFset; i < width + xOFFset; i ++){
    rect(terrain[i].x - xOFFset, height - terrain[i].height, 1, terrain[i].height);
  }
}

// function moveCharacter(){
//   imageMode(BOTTOM);
//   image(grimbo, 0.001 * characterSpot, noise(time) * height ,grimbo.width * characterScale, grimbo.height*);

// }