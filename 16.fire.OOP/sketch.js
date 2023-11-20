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
    theFireworks.push(new Particle(mouseX,mouseY, random(-5, 5), random(0,2 * PI)));
  }

}

class Particle{ 
  constructor(x,y, d, angle){
    this.x = x;
    this.y = y;
    this.d = d;
    this.radius = 5;
    this.angle = angle;

    this.r = 255;
    this.g = 0;
    this.b = 0;
    this.alpha = 255;
  }

  update(){
    //moving
    this.x = this.x + cos(this.angle) * this.d;
    this.y = this.y + sin(this.angle) * this.d;

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