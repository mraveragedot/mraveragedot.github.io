// Firework demo

let theFireworks = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  //for(let particle of theFireworks){
  for(let i = theFireworks.length-1;i >= 0; i --){
    let particle = theFireworks[i];
    particle.update();
    if(particle.isDead()){
      //remove
      theFireworks.splice(i,1);
    }
    else{
      particle.display();
    }
  }
}

function mousePressed(){
  for(let i = 0; i <500; i++){
    theFireworks.push(new Particle(mouseX,mouseY, random(-5, 5), random(-5, 5)));
  }

}

class Particle{ 
  constructor(x,y, dx, dy){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = 5;

    this.r = 255;
    this.g = 0;
    this.b = 0;
    this.alpha = 255;
  }

  update(){
    //moving
    this.x += this.dx;
    this.y += this.dy;

    //get transparent
    if(this.alpha > 0){
      this.alpha --;
    }

  }

  display(){
    noStroke();
    fill(this.r,this.g,this.b,this.alpha);
    circle(this.x,this.y,this.radius * 2);

  }

  isDead(){
    return this.alpha <= 0;
  }
}