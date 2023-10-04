// Nohl Gustafson
// Piano Tiles Game
// extra for experts include using arrays and array functions like 
// shorten() and append() as well as using text() and text features like 
// textAlign() and i also used objects for my x and y position on my tiles
// and maybe some other things i forgot to mention
// Thursday, September 28, 2023

let seconds;
let posX;
let posY;
let x;
let y;
let fx;
let fy;
let mode = 1;
let border = 50;
let startHeight = 60;
let startColor = 0;
let hardColor = 0;
let textColor = 255;
let hardText = 255;
let font = 60;
let boxSpace = 4;
let wallpaper = 220;
let eSize;
let hSize;
let Pbox;
let columns;
let column;
let tile;
let blockTiming = 2000;
let lastBlock = 0;
let speed = 5;
let quickest = 500;
let speedUp = 10;
let points = 0;
let s = true;
let d = true;
let f = true;
let h = true;
let j = true;
let k = true;


frames = 0;
minutes = 0;

let notes = []


function setup() {
  createCanvas(windowWidth, windowHeight);
  columnWidth = [ 0,0, windowWidth/4, windowWidth/6 , 0]
  pbox = windowHeight/16
}



function draw() {
  background(wallpaper);
  startScreen();
  spawning();
  keyReleased();
  game();
  buttClick();
  hud();
  movingTiles();

}

    ///just coloring player box
function buttClick(){
  if (mode === 2){
    fill(0, 200, 0);

    if(keyIsDown(68)){
      rect(0, windowHeight - pbox , columnWidth[mode]);
      
      if(notes.length != 0 && notes[notes.length-1].posX === 0 && notes[notes.length-1].posY >= windowHeight - pbox*2 && d){
        notes = shorten(notes);
        points ++;
      }
      d = false;

    }
    
    if(keyIsDown(70)){
      rect(columnWidth[mode]*1, windowHeight - pbox , columnWidth[mode]);
      
      if(notes.length != 0 && notes[notes.length-1].posX === 1 * columnWidth[mode] && notes[notes.length-1].posX <= 0 + columnWidth[mode] && notes[notes.length-1].posY >= windowHeight - pbox*2 && f){
        notes = shorten(notes);
        points ++;
      }
      f = false;
    }
    
    if(keyIsDown(72)){
      rect(columnWidth[mode]*2, windowHeight - pbox , columnWidth[mode]);
      
      if(notes.length != 0 && notes[notes.length-1].posX === 2 * columnWidth[mode] && notes[notes.length-1].posY >= windowHeight - pbox*2 && h){
        notes = shorten(notes);
        points ++;
      }
      h = false;

    }
    
    if(keyIsDown(74)){
      rect(columnWidth[mode]*3, windowHeight - pbox , columnWidth[mode]);
      
      if(notes.length != 0 && notes[notes.length-1].posX === 3 * columnWidth[mode] && notes[notes.length-1].posY >= windowHeight - pbox*2 && j){
        notes = shorten(notes);
        points ++;
      }
      j = false;
    }
  }
  if (mode === 3){
    fill(200, 0, 0);

    if (keyIsDown(83)){
      rect(0, windowHeight - pbox , columnWidth[mode]);
      
      if(notes.length != 0 && notes[notes.length-1].posX === 0 * columnWidth[mode] && notes[notes.length-1].posY >= windowHeight - pbox*2 && s){
        notes = shorten(notes);
        points ++;
      }
      s = false;

    }
    
    if (keyIsDown(68)){
      rect(columnWidth[mode], windowHeight - pbox , columnWidth[mode]);
      
      if(notes.length != 0 && notes[notes.length-1].posX === 1 * columnWidth[mode] && notes[notes.length-1].posY >= windowHeight - pbox*2 && d){
        notes = shorten(notes);
        points ++;
      }
      d = false;
      
    }
    
    if (keyIsDown(70)){
      rect(columnWidth[mode]*2, windowHeight - pbox , columnWidth[mode])
      
      if(notes.length != 0 && notes[notes.length-1].posX === 2 * columnWidth[mode] && notes[notes.length-1].posY >= windowHeight - pbox*2 && f){
        notes = shorten(notes);
        points ++;
      }
        f = false;
      
    }
    
    if (keyIsDown(72)){
      rect(columnWidth[mode]*3, windowHeight - pbox , columnWidth[mode])
      
      if(notes.length != 0 && notes[notes.length-1].posX === 3 * columnWidth[mode] && notes[notes.length-1].posY >= windowHeight - pbox*2 && h ){
        notes = shorten(notes);
        points ++;
      }
        h =false;
      
    }
    
    if (keyIsDown(74)){
      rect(columnWidth[mode]*4, windowHeight - pbox , columnWidth[mode])
      
      if(notes.length != 0 && notes[notes.length-1].posX === 4 * columnWidth[mode] && notes[notes.length-1].posY >= windowHeight - pbox*2 && j ){
        notes = shorten(notes);
        points ++;
      }
        j = false;
      
    }
    
    if (keyIsDown(75)){
      rect(columnWidth[mode]*5, windowHeight - pbox , columnWidth[mode])
      
      if(notes.length != 0 && notes[notes.length-1].posX === 5 * columnWidth[mode] && notes[notes.length-1].posY >= windowHeight - pbox*2 && k ){
        notes = shorten(notes);
        points ++;
      }
        k = false;
      
    }
    
  }
}

function game(){
  if (mode === 4){
    textSize(pbox)
    textAlign(LEFT, TOP)
    text('You Died',0,0)
    text("but your score was",0,pbox)
    text(nf(points),0,pbox*2)
    text("and you lasted", 0, pbox*3)
    text(nf(seconds),0,pbox*4)
    text("seconds",0,pbox*5)
  }
  if (mode === 2){
    columns = 4;
  }
  else if (mode === 3){
    columns = 6;
  }
  
  for(let column = 0; column < columns; column ++){
    fill(wallpaper);
    rect(columnWidth[mode] * column, 0, columnWidth[mode], windowHeight);
    rect(columnWidth[mode] * column, windowHeight - pbox, columnWidth[mode] , pbox);
  }
  
}


function startScreen(){
  if (mode === 1){
    textSize(font);
    fill(startColor);
    rect(border, border, width - border*2, startHeight);
    fill(textColor);
    text("Easy mode", border, border, width - border, border + startHeight);
    
  }
  
    //hardmode box
  if (mode ===1){
    textSize(font);
    textAlign(CENTER)
    fill(hardColor);
    rect(border, border*boxSpace, width - border*2, startHeight);
    fill(hardText);
    text("Hardmode", border, border*boxSpace, width - border, border + startHeight);
  }
  
  //easymode
  if(mouseX >= border && mouseX <= width - border && mouseY >= border && mouseY <= border + startHeight){
    startColor = 255;
    textColor = 0;
    }
  else{
    startColor = 0;
    textColor = 255;}
    if( mode === 1 && mouseX >= border && mouseX <= width - border && mouseY >= border && mouseY <= border + startHeight && mouseIsPressed){
      mode = 2
      wallpaper = "green"}
      
      //hardmode 
  if(mouseX >= border && mouseX <= width - border && mouseY >= border*boxSpace && mouseY <= border*boxSpace + startHeight){
    hardColor = 255;
    hardText = 0;
    }
  else{
    hardColor = 0;
    hardText = 255;}
    if( mode === 1 && mouseX >= border && mouseX <= width - border && mouseY >= border*boxSpace && mouseY <= border*boxSpace + startHeight && mouseIsPressed){
      mode = 3
      wallpaper = "red"
      blockTiming = blockTiming/2
      speed = speed*2

    }
}  

function spawning(){
  if (mode === 2 || mode === 3){
    if (millis() >= blockTiming + lastBlock){
      tile = {
        posX: columnWidth[mode] * round(random(columns)),
        posY: 0
      };
      if(blockTiming > quickest){
        blockTiming -= speedUp
      }
      splice(notes, tile);
      lastBlock = millis()
    }
  }
}

function movingTiles(){
  if (notes != []){
    for(let i = 0; i < notes.length; i ++ ){
      fill(0);
      rect(notes[i].posX, notes[i].posY, columnWidth[mode], pbox);
      if(notes[i].posY <= windowHeight){
        notes[i].posY += speed;
      }
      else{
        if (mode !=4){
          notes = shorten(notes);
          seconds = round(millis()/1000)
          mode = 4
        }
      }
    }
  }
}

function keyReleased(){
  if (!keyIsDown(83)){
    s = true;
  }
  if (!keyIsDown(68)){
    d = true;
  }
  if (!keyIsDown(70)){
    f = true;
  }
  if (!keyIsDown(72)){
    h = true;
  }
  if (!keyIsDown(74)){
    j = true;
  }
  if (!keyIsDown(75)){
    k = true;
  }

}

function hud(){
  if (mode === 2 || mode === 3){
      fill(255);
      textAlign(LEFT,TOP);
      textSize(pbox/2);
      text(nf(points),0,0);
      textAlign(RIGHT,TOP);
      text(nf(round(millis()/1000)),windowWidth,0);
  }
}