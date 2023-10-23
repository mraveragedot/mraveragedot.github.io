// terrain gen
//oct 23

let terrain = [];
let xOFFset = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  spawnRectangles();
}

function draw() {
  background(220);
  if (keyIsDown(RIGHT_ARROW)){
    if (xOFFset < terrain.length - 1000){
      xOFFset += 100;
    }
  }

  if(keyIsDown(LEFT_ARROW)){
    if (xOFFset > 5){
      xOFFset -= 100;
    }
  }
  
  displayRectangles();
  moveCharacter();
}

function spawnRectangles(){
  let time = 0;
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

function moveCharacter(){
  rectMode(BOTTOM);
  for(let i = xOFFset; i < width + xOFFset; i ++){
    rect(50, height - terrain[i].height, 5, -5);
  }
}