// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

}

function draw() {
  background(220);
  push();
  rectMode(BOTTOM);
  translate(100,50);
  rotate(mouseY);
  rect(0, 0, 75, 25);
  pop();

  rect(100, 50,75,25);
}


