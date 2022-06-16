const card = document.getElementsByClassName("card");
const GameBoard = (() => {
  // null is 'empty', 0 is 'O' and 1 is 'X'
  const grid = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  const valueAt = (i, j) => {
    if (grid[i][j] === null) {
      return "null";
    }
    if (grid[i][j] === 0) {
      return "O";
    }
    if (grid[i][j] === 1) {
      return "X";
    }
  };

  const setValue = (i, j, k) => {
    if (k === null) {
      grid[i][j] = null;
    }
    if (k === 0) {
      grid[i][j] = 0;
    }
    if (k === 1) {
      grid[i][j] = 1;
    } else {
      return 0;
    }
  };

  const resetGrid = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        setValue(i, j, null);
      }
    }
  };

  const printGrid = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        console.log(valueAt(i, j));
        // console.log("\t");
      }
      // console.log("\n\n");
    }
  };

  const getGrid = () => {
    return grid;
  };

  const setGrid = (x) => {
    grid = x;
  }
  return { getGrid, setGrid, printGrid, resetGrid };
})();

function insert(i) {
  if (i == null) {
    return "";
  }
  if (i == 0) {
    return "O";
  }
  if (i == 1) {
    return "X";
  }
}

function render() {
  ele11.innerText = insert(grid[0][0]);
  ele12.innerText = insert(grid[0][1]);
  ele13.innerText = insert(grid[0][2]);
  ele21.innerText = insert(grid[1][0]);
  ele22.innerText = insert(grid[1][1]);
  ele23.innerText = insert(grid[1][2]);
  ele31.innerText = insert(grid[2][0]);
  ele32.innerText = insert(grid[2][1]);
  ele33.innerText = insert(grid[2][2]);
}

function activate(x) {
  x.style.border = "3px solid darkgreen";
  x.style.color = "black";
}
function deactivate(x) {
  x.style.border = "none";
}

function inputHandler(x){

}

function Player1Turn(validMove, msg){

}

function Player2Turn(validMove, msg){

}

function initGame() {
  const grid = GameBoard.getGrid();
  const validMove = "X";
  const ele11 = document.getElementById("ele11");
  const ele12 = document.getElementById("ele12");
  const ele13 = document.getElementById("ele13");
  const ele21 = document.getElementById("ele21");
  const ele22 = document.getElementById("ele22");
  const ele23 = document.getElementById("ele23");
  const ele31 = document.getElementById("ele31");
  const ele32 = document.getElementById("ele32");
  const ele33 = document.getElementById("ele33");
  const player1 = {};
  player1.name = "Rishabh";
  // player1.name = prompt("Player1's Name (X): ");
  player1.points = 0;
  const player2 = {};
  player2.name = "Saloni";
  // player2.name = prompt("Player1's Name (O): ");
  player2.points = 0;
  const msg = document.querySelector(".message");
  msg.innerText = `Game Started!... Click anywhere in grid!`;
  const buttonx = document.querySelector(".choice-x");
  const buttono = document.querySelector(".choice-y");
  for(let i=0;i<3;i++){
    for(let j=0;j<3;j++){
      if((3*i+j)%2==0){
        Player1Turn();
      }
      else{
        Player2Turn();
      }
    }
  }
}




initGame();