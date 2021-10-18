/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let otherPlayer=2; //inactive player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  return board= [
    [ null, null, null, null, null, null, null ],
    [ null, null, null, null, null, null, null ],
    [ null, null, null, null, null, null, null ],
    [ null, null, null, null, null, null, null ],
    [ null, null, null, null, null, null, null ],
    [ null, null, null, null, null, null, null ],
  ];
}
/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"

  const htmlBoard=document.querySelector("#board")

  // TODO: add comment for this code
  const top = document.createElement("tr");  //top row is created
  top.setAttribute("id", "column-top");      //id is given for top element
  top.addEventListener("click", handleClick);//top row event listener added, when it is clicked handleClick function is called

  for (let x = 0; x < WIDTH; x++) {                        //cells created for top row and id given for each cells
    const headCell = document.createElement("td");    
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // TODO: add comment for this code
  for (let y = 0; y < HEIGHT; y++) {                          //cells for board created: 7(width:x) by 6 matrix(height:y)
    const row = document.createElement("tr");                 //for each row new element created
    for (let x = 0; x < WIDTH; x++) {                         //cells are created for each row
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);                                    //each row added to the html board
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for(let i=HEIGHT-1;i>=0;i--){
    if (board[i][x]===null){
      return i                    //Loop through each rows starting from the last row and check xth element(xth column) in each row
    }                                       //until finding the first non-null spot
  }
  return null
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const div=document.createElement("div")
  const row=document.getElementById(`${y}-${x}`)
  div.classList.add("piece", `player${currPlayer}`)
  return row.append(div)
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg)
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;
  console.log(x)
  
  

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {                                       //if the spot is clicked full, the click is ignored
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  placeInTable(y, x);
  board[y][x]=currPlayer                                  


  // check for win
  if (checkForWin()) {
    endGame(`Player ${currPlayer} won!`);
    resetGame();
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  else if (board.filter((arr)=>arr.indexOf(null)!==-1).length===0) {
    endGame("Tie!!!")
    resetGame();
  }
  // switch players
  // TODO: switch currPlayer 1 <-> 2
  [currPlayer,otherPlayer]=[otherPlayer,currPlayer]
  
}


/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&                          //Boundary Conditions
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&      
        board[y][x] === currPlayer        //Checking color
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];                     //Checking each spaces in the board
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}


const startBtn=document.querySelector("#start")
startBtn.addEventListener("click",startGame)

const resetBtn=document.querySelector("#reset")
resetBtn.addEventListener("click",resetGame)


function startGame(){
  resetGame();
}

function resetGame(){
  const myNode=document.querySelector("#board")
  while (myNode.firstChild) {
    myNode.removeChild(myNode.lastChild);
  }
  makeBoard();
  makeHtmlBoard();
}




