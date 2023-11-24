// Blockadoku
// Nohl
// October 27 2023
//
// Extra for Experts:
// I made it so that any 2d array  with ones and zeros can be used to create a shape on the grid 
// Then it checks if that shape can be placed and if it can it will make a gray shadow and if you click it will then place that block
// then i check if the sum of the grids columns are equal to 9 and if it is it clears the rows, columns and squares that were full.
// the most annoying part of this project was making all the possibilities for which shapes you had or could have i wish i used a list 
// that contained all the shapes a boolean if you had it that way instead of writing everything 4 different times i could of used a for loop 
// to search if i had it then if i did use the shape to put in on the grid 


//setting variables 
const GRID_SIZE = 9;
let points = 0;
let grid = [];
let shapeGrid = [];
let cellSize;
let otherCellSize;
let shapes = [];
let haveBlock = false;

//making lists of shapes that will be used to place on grid
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

//variable for saying which is currently in players hand
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





//creating starting grids and the cell size for those gridds
function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = createEmptyGrid();
  shapeGrid = createShapeGrid();
    
  cellSize = height / 18;
  otherCellSize = height / 36;

}

//main draw loop
function draw() {
  background(80,47,13);
  doYouHaveShape();  
  displayGrid(GRID_SIZE, GRID_SIZE);
  displayShapeGrid(5, 18);
  usableShapes();
  clearGrid();
  displayPoints();
}

//displaying the points on screen
function displayPoints(){
  fill("black");
  textSize(height/16);

  text(str(points), width/3, height/16);
  
}

//displays the lower grid that holds the shapes
function displayShapeGrid(rows, cols){
  for(let y = 0; y < rows; y ++){
    for (let x = 0; x < cols; x ++){
      if(shapeGrid[y][x] === 0){ //makes the squares a different color 
        if (x < 6 || x > 11){
          fill(139,139,59); // makes left nad right rectangles green
        }
        else{
          fill(149,159,109); //makes middle light green
        }
      }
      else if (shapeGrid[y][x] === 1){ // if there is a block have it brown
        fill(73, 32, 0);
      }
      rect(x * otherCellSize + width/3 , height - cellSize*4 + y * otherCellSize, otherCellSize, otherCellSize); //drawing the grid
    }
  }
  shapeGrid = createShapeGrid();
  
}


function createEmptyGrid(){ // creates the game board
  let emptyGrid = [];
  for(let y = 0; y < GRID_SIZE; y++){
    emptyGrid.push([]);
    for (let x = 0; x < GRID_SIZE; x ++){
      emptyGrid[y].push(0);
    }
  }
  return emptyGrid;
}

function createShapeGrid(){ // creates empty grid to hold players shapes
  let emptyGrid = [];
  for(let y = 0; y < 5; y++){
    emptyGrid.push([]);
    for (let x = 0; x < 18; x ++){
      emptyGrid[y].push(0);
    }
  }
  return emptyGrid;
}

function displayGrid(cols, rows){ //displays the main board 
  for(let y = 0; y < cols; y ++){
    for (let x = 0; x < rows; x ++){
      if(grid[y][x] === 0){
        // eslint-disable-next-line no-extra-parens
        if ( (y < 3 && (x < 3 || x > 5)) || (y > 2 && y < 6  && x > 2 && x < 6) || (y > 5 && (x < 3 || x > 5)) ){ //makes it so the squares aren't beside the same color
          fill(150, 75, 0);
        }
        else{
          fill(200, 125, 0);
        }
      }
      else if (grid[y][x] === 1){ // if there is a shape make it brown
        fill(73, 32, 0);
      }
      else if (grid[y][x] === 2){ // if player is hovering over spot and it can be placed color gray
        fill(100,100,100);
      }
      rect(x * cellSize + width/3, y * cellSize + height/6, cellSize, cellSize); //drawing the main board
      if (grid[y][x] === 2){
        grid[y][x] = 0; // getting rid of the block "shadow"
      }
    }
  }
}

function doYouHaveShape(){ //if you have the shape it calls the function displayShape()
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
    displayShape(shortestVer);
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
  if (x + theShape[0].length > GRID_SIZE || y + theShape.length > GRID_SIZE || x < 0 || y <0){ // if you are outside of the grid makes it so shape shadow isnt displayed
    place = false;
  }
  
  if (place){ //if inside the grid checks if its a valid spot to be placed
    for(let i = 0; i < theShape.length; i ++){
      for(let j = 0; j < theShape[i].length; j ++){

        if (grid[y+i][x+j] !== 0 && theShape[i][j] !== 0){
          place = false;
        }
      }
    }
  }

  if (place){ // if in grid and valid spot then makes the shape shadow (the gray spot on board showing where you would put block if you clicked)
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
  if (!haveBlock){ // if you arent holding shape calls giveShape()
    giveShape();

  }

  else if (haveBlock){ // if you have shape sends what shape you have to the placeblock() function 1st thing is the shape array, 2nd ask is the number that corrisponds with that shape

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
      placeBlock(shortestVer,4);
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

  
}

function placeBlock(theShape, whatitis){
  let place = true;
  let x = floor((mouseX - width/3) / cellSize);
  let y = floor((mouseY - height/6) / cellSize);
  if (x + theShape[0].length > GRID_SIZE || y + theShape.length > GRID_SIZE){ // checks if you are inside grid
    place = false;
  }
  
  if (place){ //checks if you can actually place
    for(let i = 0; i < theShape.length; i ++){

      for(let j = 0; j < theShape[i].length; j ++){
        if (grid[y+i][x+j] !== 0 && theShape[i][j] !== 0){
          place = false;
        }
      }
    }
  }
  if (place){ // actually places the block onto the grid
    for(let i = 0; i < theShape.length; i ++){

      for(let j = 0; j < theShape[i].length; j ++){
        if (theShape[i][j] !== 0){
          grid[y+i][x+j] = theShape[i][j];
          haveBlock = false;
          points += 1;
          
        }

      }
    }

  }
  if (!place){ // if wasnt able to place puts the shape back in the shape grid
    haveBlock = false;
    shapes.push(whatitis);
  }
  
}

function usableShapes(){ 
  if (shapes.length === 0 && !haveBlock){ //if you have used all shapes gives three new random shapes
    shapes.push(floor(random(1, 17)));
    shapes.push(floor(random(1, 17)));
    shapes.push(floor(random(1, 17)));
  }
  for(let i = 0; i < shapes.length; i ++){ // based on what random shape is given sends it to the displayItem function to be drawn on the shape grid
    if (shapes[i] === 1){
      displayItems(shortestHor, i);
    }
    else if (shapes[i] === 2){
      displayItems(shortHor, i);
    }
    else if (shapes[i] === 3){
      displayItems(longHor, i);
    }
    else if (shapes[i] === 4){
      displayItems(shortestVer, i);
    }
    else if (shapes[i] === 5){
      displayItems(shortVer, i);
    }
    else if (shapes[i] === 6){
      displayItems(longVer, i);
    }
    else if (shapes[i] === 7){
      displayItems(NWL, i);
    }
    else if (shapes[i] === 8){
      displayItems(NEL, i);
    }
    else if (shapes[i] === 9){
      displayItems(SWL, i);
    }
    else if (shapes[i] === 10){
      displayItems(SEL, i);
    }
    else if (shapes[i] === 11){
      displayItems(upT, i);
    }
    else if (shapes[i] === 12){
      displayItems(downT, i);
    }
    else if (shapes[i] === 13){
      displayItems(leftT, i);
    }
    else if (shapes[i] === 14){
      displayItems(rightT, i);
    }
    else if (shapes[i] === 15){
      displayItems(theSquare, i);
    }
    else if (shapes[i] === 16){
      displayItems(savior, i);
    }
  }
}


function displayItems(theShape , box){ // displays the the blocks on the shpae grid 
  
  for(let i = 0; i < theShape.length; i ++){

    for(let j = 0; j < theShape[i].length; j ++){
      if (theShape[i][j] !== 0){
        shapeGrid[i][box*6 + j] = theShape[i][j];
      }

    }
  }
  
}

function giveShape(){ 
  let x = floor((mouseX - width/3) / otherCellSize);
  let y = floor((mouseY - height - cellSize*4) / otherCellSize);

  if (x >= 0 && x <= 5 && y <= -12 && y >= -16){ // if you click on the first square gives you that shape
    haveBlock = true;
    makeHaveShape(shapes[0]); 
    shapes.splice(0,1);
  }
  else if (x >= 6 && x <= 11 && y <= -12 && y >= -16){ // gives second square shape
    haveBlock = true;
    makeHaveShape(shapes[1]);
    shapes.splice(1,1);
  }
  else if (x >= 12 && x <= 17 && y <= -12 && y >= -16){ //gives third square shape
    haveBlock = true;
    makeHaveShape(shapes[2]);
    shapes.splice(2,1);
  }

}

function makeHaveShape(whereInShape){ //when you are given shape makes it so that shape variable is true so it can be displayed and placed
  if(whereInShape === 1){
    haveShortestHor = true;
  }
  if(whereInShape === 2){
    haveShortHor = true;
  }
  if(whereInShape === 3){
    haveLongHor = true;
  }
  if(whereInShape === 4){
    haveShortestVer = true;
  }
  if(whereInShape === 5){
    haveShortVer = true;
  }
  if(whereInShape === 6){
    haveLongVer = true;
  }
  if(whereInShape === 7){
    haveNWL = true;
  }
  if(whereInShape === 8){
    haveNEL = true;
  }
  if(whereInShape === 9){
    haveSWL = true;
  }
  if(whereInShape === 10){
    haveSEL = true;
  }
  if(whereInShape === 11){
    haveUpT = true;
  }
  if(whereInShape === 12){
    haveDownT = true;
  }
  if(whereInShape === 13){
    haveLeftT = true;
  }
  if(whereInShape === 14){
    haveRightT = true;
  }
  if(whereInShape === 15){
    haveTheSquare = true;
  }
  if(whereInShape === 16){
    haveSavior = true;
  }
}

function clearGrid(){ 
  let sum = 0;
  let clearRow = [];
  let clearSquare = [];
  let clearColumn = [];
  for (let y = 0; y < grid.length; y ++){ // goes through each row and adds up each spot if the sum is 9 then pushes the row number to be cleared
    for (let x = 0; x < grid[y].length; x ++){
      if(grid[y][x] === 1){
        sum += grid[y][x];

      }
    }
    if (sum === 9){
      clearRow.push(y);
      sum = 0;
    }
    else if(sum !== 9){
      sum = 0;
    }
  }

  for (let x = 0; x < grid.length; x ++){ // checks each column and adds each square to see if the sum is 9 if so it pushes the column number to be cleared
    for (let y = 0; y < grid[x].length; y++){
      if (grid[y][x] === 1){
        sum += grid[y][x];
      }
    }
    if (sum === 9){
      clearColumn.push(x);
      sum = 0;
    }
    else if(sum !== 9){
      sum = 0;
    }
  }

  for(let i = 0; i < 3; i ++){ //checks each 3x3 square thats colored if the sum is 9 pushes the cordinates to get rid of 3x3
    for(let j = 0; j < 3; j ++){

      for (let y = 0; y < 3; y++){
        for (let x = 0; x < 3; x++){
          if (grid[i*3 + y][j*3 + x] === 1){
            sum += 1;
          }
        }
      }

      if (sum === 9){
        sum = 0;
        clearSquare.push([i,j]);
      }
      if (sum !== 9){
        sum = 0;
        
      }
    }
  }

  //reason i cleared things afterwards so that one move can clear both a column and a row at the same time

  let multiplier = clearColumn.length + clearGrid.length + clearRow.length;
  if( multiplier === 0){
    multiplier = 1; // if you clear more then one thing at the same time adds multiplier
  }
  points += (clearColumn.length * 30 + clearGrid.length * 30 + clearRow.length * 30) * multiplier;

  for(let i = 0; i < clearRow.length; i ++){ //clears the row 
    for(let j = 0; j < 9; j ++){
      grid[clearRow[0]][j] = 0;
    }
  }
  clearRow = [];
  
  for(let j = 0; j < clearColumn.length; j ++){ // clears the column
    for(let i = 0; i < 9; i++){
      grid[i][clearColumn[j]] = 0;
    }
  }
  clearColumn = [];

  for(let i = 0; i < clearSquare.length;i++){ //from the cordinate counts from that spot in a square formation to set back to clear
    for (let y = 0; y < 3; y++){
      for (let x = 0; x < 3; x++){
        grid[clearSquare[i][0] * 3 + y][[clearSquare[i][1] * 3 + x]] = 0;
        console.log(clearSquare[i][0] + y, clearSquare[i][1] + x);
      }
    }
  }
  clearSquare = [];

}