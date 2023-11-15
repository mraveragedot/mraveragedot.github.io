// Ball OOP

class Ball {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.radius = random(15,30);
    this.dx = random(-5,5);
    this.dy = random(-5,5);
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
  }

  move(){
    if (this.x + this.radius > width){
      this.dx = this.dx * -1;
    }
    if (this.x - this.radius < 0){
      this.dx = this.dx * -1;
    }
    if (this.y - this.radius < 0){
      this.dy = this.dy * -1;
    }
    if (this.y + this.radius > height){
      this.dy = this.dy * -1;
    }

    this.x += this.dx;
    this.y += this.dy;
  }

  display(){
    fill(this.r, this.g, this.b);
    circle(this.x, this.y, this.radius*2);

  }

  bounceOff(otherBall){
    let radiiSum = this.radius + otherBall.radius;
    let distanceApart = dist(this.x, this.y, otherBall.x, otherBall.y);
    if (radiiSum > distanceApart){
      // hitting each other
      let tempDx = this.dx;
      let tempDy = this.dy;

      this.dx = otherBall.dx;
      this.dy = otherBall.dy;
      otherBall.dx = tempDx;
      otherBall.dy = tempDy;
    }
  }
}

let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  let theBall = new Ball(width/2, height/2);
  ballArray.push(theBall);
}

function draw() {
  background(220);
  for (let someBall of ballArray){
    someBall.move();
    for(let otherBall of ballArray){
      //not check self
      if(someBall !== otherBall){
        someBall.bounceOff(otherBall);
      }
    }
    someBall.display();
  }

}

function mousePressed(){
  let theBall = new Ball(mouseX, mouseY);
  ballArray.push(theBall);
}
