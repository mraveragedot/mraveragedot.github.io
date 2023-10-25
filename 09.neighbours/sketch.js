// 2d grid neighbours

let cellSize;
let grid = [];

const GRID_SIZE = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  if (width/GRID_SIZE < height/GRID_SIZE){
    cellSize = width/GRID_SIZE;
  }
  else{
    cellSize = height/GRID_SIZE;
  }
  grid = createGrid(GRID_SIZE, GRID_SIZE);
}

function draw() {
  background(220);
  displayGrid(GRID_SIZE, GRID_SIZE);
}

function createGrid(cols, rows){
  let newGrid = [];
  for(let y = 0; y < rows; y++){
    grid.push([]);
    for(let x = 0; x < cols; x ++){
      let number = random(0,100);
      if (number < 50){
        grid[x].push(1);
      }
      else{
        grid[x].push(0);
      }
    }
  }
  return newGrid;
}

function generateEmptyGrid(cols, rows){
  let newGrid = [];
  for(let y = 0; y < rows; y++){
    grid.push([]);
    for(let x = 0; x < cols; x ++){ 
      grid[x].push(0);
    }
  }
  return newGrid;

}

function displayGrid(){
  for(let y = 0; y < GRID_SIZE; y ++){
    for (let x = 0; x < GRID_SIZE; x ++){
      if(grid[y][x] === 0){
        fill("white");
      }
      else if (grid[y][x] === 1){
        fill("black");
      }
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}

