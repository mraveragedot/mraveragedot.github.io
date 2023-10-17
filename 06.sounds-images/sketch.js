// images and sounds demo

let field;
let backgroundSound;
let vicSound;
let scalor;

function preload() {
  field = loadImage("country field.png");
  vicSound = loadSound("victorySound.mp3");
  backgroundSound = loadSound("background_music_loop.mp3");
  backgroundSound.setVolume(0.5);
  vicSound.setVolume(1.0);
}

function setup() {
  createCanvas(windowWidth, windowHeight);

}

function draw() {
  background(220);
  image(field, 0, 0, width,height);
}


function mousePressed(){
  vicSound.play();
  if(!backgroundSound.isPlaying()){
    backgroundSound.loop();
  }
}
