// 2D array grid
// nohl

let grid;
let cellSize;
const GRID_SIZE = 4;

function setup() {
  createCanvas(windowWidth, windowHeight);
  if (width > height){
    cellSize = height/GRID_SIZE;
  }
  else{
    cellSize = width/GRID_SIZE;
  }
  
  grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);

  generateRandomGrid();
}

function draw() {
  background(220);
  displayGrid();
}

function keyTyped(){
  if (key === "r"){
    grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  }

  if (key === "e"){
    grid = generateEmptygrid(GRID_SIZE, GRID_SIZE);
  }
}

function displayGrid(){
  for (let y = 0;y < GRID_SIZE; y ++) {
    for (let x = 0; x < GRID_SIZE; x ++){
      if (grid[y][x] === 1){
        fill("black");
      }
      else{
        fill("white");
      }
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}

function generateRandomGrid(cols, rows){
  let randomArray = [];
  for (let y = 0; y < cols; y ++){
    randomArray.push([]);
    for (let x = 0; x < rows; x++) {
      if (random(100) < 50){
        randomArray[y].push(0);
      }
      else {
        randomArray[y].push(1);
      }
    }
  }
  return randomArray;
}

function generateEmptygrid(cols, rows){
  let randomArray = [];
  for (let y = 0; y < cols; y ++){
    randomArray.push([]);
    for (let x = 0; x < rows; x++) {
      randomArray[y].push(0);
    }
  }
  return randomArray;
}

function mousePressed(){
  for (let y = 0;y < GRID_SIZE; y ++) {
    for (let x = 0; x < GRID_SIZE; x ++){
      if (mouseX < )
    }
  }
}

