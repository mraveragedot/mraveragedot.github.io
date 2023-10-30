// charcacter in grid demo


let grid;
let cellSize;
const GRID_SIZE = 40;
let playerX = 0;
let playerY = 0;


function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);

  //put player in grid 
  grid[playerY][playerX] = 9;

  if (height > width) {
    cellSize = width/GRID_SIZE;
  }
  else {
    cellSize = height/GRID_SIZE;
  }
}

function draw() {
  background(220);
  displayGrid();

}

function keyTyped(){
  if (key === "r"){
    grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  }
  else if (key === "e"){
    grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  }
  else if (key === "s"){ //move down
    movePlayer(0, 1);
  }
  else if (key === "a"){ //left
    movePlayer(-1, 0);
  }
  else if (key === "w"){ //up
    movePlayer(0, -1);
  }
  else if (key === "d"){ //right
    movePlayer(1, 0);
  }
}

function movePlayer(x,y){
  //edge case check
  if(playerX + x >= 0 && playerX + x < GRID_SIZE && playerY + y >= 0 && playerY + y < GRID_SIZE){
    // check for walls
    if(grid[playerY + y][playerX + x] === 0){
      let tempX = playerX;
      let tempY = playerY;

      playerX += x;
      playerY += y;

      //update grid
      grid[playerY][playerX] = 9;
      grid[tempY][tempX] = 0;
    }
  }
}

function mousePressed(){
  let y = Math.floor(mouseY/cellSize);
  let x = Math.floor(mouseX/cellSize);

  toggleCell(x, y); // current cell
}


function toggleCell(x,y){
  if(x >= 0 && x <= GRID_SIZE - 1 && y >= 0 && y <= GRID_SIZE - 1){
    if (grid [y][x] === 0){
      grid[y][x] = 1;
    }
    else if (grid[y][x] === 1){
      grid[y][x] = 0;
    }
  }
}

function displayGrid() {
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (grid[y][x] === 0) {
        fill("white");
      }
      else if (grid[y][x] === 1) {
        fill("black");
      }
      else if (grid[y][x]){
        fill("blue");
      }
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}


function generateRandomGrid(cols, rows) {
  let randomArray = [];
  for (let y = 0; y < cols; y++) {
    randomArray.push([]);
    for (let x = 0; x < rows; x++) {
      if (random(100) < 50) {
        randomArray[y].push(0);
      }
      else {
        randomArray[y].push(1);
      }
    }
  }
  return randomArray;
}

function generateEmptyGrid(cols, rows) {
  let randomArray = [];
  for (let y = 0; y < cols; y++) {
    randomArray.push([]);
    for (let x = 0; x < rows; x++) {
      randomArray[y].push(0);
    }
  }
  return randomArray;
}

