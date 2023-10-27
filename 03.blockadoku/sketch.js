// Blockadoku
// Nohl
// October 27 2023
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const GRID_SIZE = 9;
let grid = [];
let cellSize;


function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = createEmptyGrid();
    
  cellSize = height / 18;

}

function draw() {
  background(220);
  displayGrid(GRID_SIZE, GRID_SIZE);
}

function createEmptyGrid(){
  let emptyGrid = [];
  for(let y = 0; y < GRID_SIZE; y++){
    emptyGrid.push([]);
    for (let x = 0; x < GRID_SIZE; x ++){
      emptyGrid[y].push(0);
    }
  }
  return emptyGrid;
}

function displayGrid(cols, rows){
  for(let y = 0; y < cols; y ++){
    for (let x = 0; x < rows; x ++){
      if(grid[y][x] === 0){
        if ( (y < 3 && x < 3 || x > 5) || (y > 2 && y < 6  && x > 2 && x < 6) || (y > 5 && x < 3 || x > 5) ){
          fill(150, 75, 0);
        }
        else{
          fill(200, 125, 0);
        }
      }
      else{
        fill(73, 32, 0);
      }
      rect(x * cellSize + width/3, y * cellSize + height/6, cellSize, cellSize);
    }
  }
}