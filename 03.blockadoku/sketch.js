// Blockadoku
// Nohl
// October 27 2023
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const GRID_SIZE = 9;
let grid = [];
let shapeGrid = [];
let cellSize;
let shapes = [];


let shortestHor = [[1,1]];
let shortHor = [[1,1,1]];
let longHor = [[1,1,1,1,1]];
let shortestVer = [[1],[1]];
let shortVer = [[1],[1],[1]];
let longVer = [[1],[1],[1],[1],[1]];
let theSquare = [[1,1],[1,1]];
let NWL = [[1,1,1],[1,0,0],[1,0,0]];
let SWL = [[1,0,0],[1,0,0],[1,1,1]];
let NEL = [[1,1,1],[0,0,1],[0,0,1]];
let SEL = [[0,0,1],[0,0,1],[1,1,1]];
let leftT = [[0,1],[1,1],[0,1]];
let rightT = [[1,0],[1,1],[1,0]];
let upT = [[0,1,0],[1,1,1]];
let downT = [[1,1,1],[0,1,0]];
let savior = [[1]];

let haveShortestHor = false;
let haveShortHor = false;
let haveLongHor = false;
let haveShortestVer = false;
let haveShortVer = false;
let haveLongVer = false;
let haveTheSquare = false;
let haveNWL = false;
let haveSWL = false;
let haveNEL = false;
let haveSEL = false;
let haveLeftT = false;
let haveRightT = false;
let haveUpT = false;
let haveDownT = false;
let haveSavior = false;






function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = createEmptyGrid();
  shapeGrid = createShapeGrid();
    
  cellSize = height / 18;

}

function draw() {
  background(80,47,13);
  doYouHaveShape();  
  displayGrid(GRID_SIZE, GRID_SIZE);
  displayShapeGrid(GRID_SIZE/3, GRID_SIZE);
  usableShapes();
}

function displayShapeGrid(rows, cols){
  for(let y = 0; y < rows; y ++){
    for (let x = 0; x < cols; x ++){
      if(shapeGrid[y][x] === 0){
        if (x < 3 || x > 5){
          fill(139,139,59);
        }
        else{
          fill(149,159,109);
        }
      }
      else if (shapeGrid[y][x] === 1){
        fill(73, 32, 0);
      }
      rect(x * cellSize + width/3, height - cellSize*4 + y * cellSize, cellSize, cellSize);
    }
  }
  
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

function createShapeGrid(){
  let emptyGrid = [];
  for(let y = 0; y < GRID_SIZE/3; y++){
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
        // eslint-disable-next-line no-extra-parens
        if ( (y < 3 && (x < 3 || x > 5)) || (y > 2 && y < 6  && x > 2 && x < 6) || (y > 5 && (x < 3 || x > 5)) ){
          fill(150, 75, 0);
        }
        else{
          fill(200, 125, 0);
        }
      }
      else if (grid[y][x] === 1){
        fill(73, 32, 0);
      }
      else if (grid[y][x] === 2){
        fill(100,100,100);
      }
      rect(x * cellSize + width/3, y * cellSize + height/6, cellSize, cellSize);
      if (grid[y][x] === 2){
        grid[y][x] = 0;
      }
    }
  }
}

function doYouHaveShape(){
  if (haveShortestHor){
    displayShape(shortestHor);
  }
  else if (haveShortHor){
    displayShape(shortHor);
  }
  else if (haveLongHor){
    displayShape(longHor);
  }
  else if (haveShortestVer){
    displayShape(shortVer);
  }
  else if (haveShortVer){
    displayShape(shortVer);
  }
  else if (haveLongVer){
    displayShape(longVer);
  }
  else if (haveNWL){
    displayShape(NWL);
  }
  else if (haveNEL){
    displayShape(NEL);
  }
  else if (haveSWL){
    displayShape(SWL);
  }
  else if (haveSEL){
    displayShape(SEL);
  }
  else if (haveUpT){
    displayShape(upT);
  }
  else if (haveDownT){
    displayShape(downT);
  }
  else if (haveLeftT){
    displayShape(leftT);
  }
  else if (haveRightT){
    displayShape(rightT);
  }
  else if (haveTheSquare){
    displayShape(theSquare);
  }
  else if (haveSavior){
    displayShape(savior);
  }

}

function displayShape(theShape){
  let place = true;
  let x = floor((mouseX - width/3) / cellSize);
  let y = floor((mouseY - height/6) / cellSize);
  if (x + theShape[0].length > GRID_SIZE || y + theShape.length > GRID_SIZE){
    place = false;
  }
  
  if (place){
    for(let i = 0; i < theShape.length; i ++){

      for(let j = 0; j < theShape[i].length; j ++){
        if (grid[y+i][x+j] !== 0 && theShape[i][j] !== 0){
          place = false;
        }
      }
    }
  }
  if (place){
    for(let i = 0; i < theShape.length; i ++){

      for(let j = 0; j < theShape[i].length; j ++){
        if (theShape[i][j] !== 0){
          grid[y+i][x+j] = theShape[i][j] + 1;

        }

      }
    }

  }
}



function mouseClicked(){
  if (haveShortestHor){
    placeBlock(shortestHor,1);
    haveShortestHor = !haveShortestHor;
  }
  else if (haveShortHor){
    placeBlock(shortHor,2);
    haveShortHor = !haveShortHor;
  }
  else if (haveLongHor){
    placeBlock(longHor,3);
    haveLongHor = !haveLongHor;
  }
  else if (haveShortestVer){
    placeBlock(shortVer,4);
    haveShortestVer = !haveShortestVer;
  }
  else if (haveShortVer){
    placeBlock(shortVer,5);
    haveShortVer = !haveShortVer;
  }
  else if (haveLongVer){
    placeBlock(longVer,6);
    haveLongVer = !haveLongVer;
  }
  else if (haveNWL){
    placeBlock(NWL,7);
    haveNWL = !haveNWL;
  }
  else if (haveNEL){
    placeBlock(NEL,8);
    haveNEL = !haveNEL;
  }
  else if (haveSWL){
    placeBlock(SWL,9);
    haveSWL = !haveSWL;
  }
  else if (haveSEL){
    placeBlock(SEL,10);
    haveSEL = !haveSEL;
  }
  else if (haveUpT){
    placeBlock(upT,11);
    haveUpT = !haveUpT;
  }
  else if (haveDownT){
    placeBlock(downT,12);
    haveDownT = !haveDownT;
  }
  else if (haveLeftT){
    placeBlock(leftT,13);
    haveLeftT = !haveLeftT;
  }
  else if (haveRightT){
    placeBlock(rightT,14);
    haveRightT = !haveRightT;
  }
  else if (haveTheSquare){
    placeBlock(theSquare,15);
    haveTheSquare = !haveTheSquare;
  }
  else if (haveSavior){
    placeBlock(savior,16);
    haveSavior = !haveSavior;
  }

  
}

function placeBlock(theShape, whatitis){
  let place = true;
  let x = floor((mouseX - width/3) / cellSize);
  let y = floor((mouseY - height/6) / cellSize);
  if (x + theShape[0].length > GRID_SIZE || y + theShape.length > GRID_SIZE){
    place = false;
  }
  
  if (place){
    for(let i = 0; i < theShape.length; i ++){

      console.log(1);
      console.log(theShape);
      for(let j = 0; j < theShape[i].length; j ++){
        if (grid[y+i][x+j] !== 0 && theShape[i][j] !== 0){
          place = false;
        }
      }
    }
  }
  console.log(place);
  if (place){
    for(let i = 0; i < theShape.length; i ++){

      for(let j = 0; j < theShape[i].length; j ++){
        if (theShape[i][j] !== 0){
          grid[y+i][x+j] = theShape[i][j];

        }

        console.log(3);
      }
    }

  }
  
}

function usableShapes(){
  if (shapes.length === 0){
    shapes.push(floor(random(1,16.999)));
    shapes.push(floor(random(1,16.999)));
    shapes.push(floor(random(1,16.999)));
  }
  for(let i = 0; i < shapes.length; i ++){
  }
}