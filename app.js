const gameBoard = (function () {
  board = [];
  const player1 = { score: 0 };
  const player2 = { score: 0 };

  let currentPlayer = player1;

  function setPlayersInfo(p1,p2) {
    player1.name = p1.getName();
    player1.symbol = p1.getSymbol();

    player2.name = p2.getName();
    player2.symbol = p2.getSymbol();

    displayController.renderPlayersInfo(player1, player2);
    displayController.updateTurn(currentPlayer);
    const boardContainer = displayController.renderBoard(board);
    activateBoard(boardContainer);
  }

  function resetBoard() {
    board=[];
    console.log("BOARD RESET!");
  }

  function activateBoard(boardDOM) {
    const squares = boardDOM.querySelectorAll(".board span");
    squares.forEach((square) => {
      square.addEventListener("click", handleClick);
    });
  }

  function isWin() {
    for (let i = 0; i < 9; i += 3) {
      if (board[i] && board[i] === board[i + 1] && board[i + 2] === board[i + 1]) {
        return true;
      }
    }

    for (let i = 0; i < 9; i += 1) {
      if (board[i] && board[i] === board[i + 3] && board[i + 6] === board[i + 3] ) {
        return true;
      }
    }

    if (board[0] && board[0] === board[4] && board[8] === board[4]) {
      return true;
    }

    if (board[2] && board[2] === board[4] && board[6] === board[4]) {
      return true;
    }

    return false;
  }

  function isDraw() {
    return (
      board[0] &&
      board[1] &&
      board[2] &&
      board[3] &&
      board[4] &&
      board[5] &&
      board[6] &&
      board[7] &&
      board[8]
    );
  }

  function handleClick(event) {
    const index = Number(event.target.getAttribute("data-index"));

    if (board[index]) {
      console.log("[Warning] cannot edit the previous move!");
      displayController.showWarning();
    } else {
      board[index] = currentPlayer.symbol;
      const boardContainer = displayController.renderBoard(board);
      if (isWin()) {
        displayController.congrats(currentPlayer);
        displayController.renderPlayersInfo(player1, player2);
      } else if (isDraw()) {
        displayController.showDraw();
      } else {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        displayController.updateTurn(currentPlayer);
        activateBoard(boardContainer);
      }
    }
  }

  return { setPlayersInfo, resetBoard };
})();

const displayController = (function () {

  const boardHolder = document.querySelector(".grid-container .board");
  const resetBtn = document.querySelector(".reset");
  const resetButton = document.querySelector(".reset");

  const p1NameHolder = document.querySelector('#player1-info .info .name');
  const p2NameHolder = document.querySelector('#player2-info .info .name');
  const p1SymbolHolder = document.querySelector('#player1-info .info .symbol');
  const p2SymbolHolder = document.querySelector('#player2-info .info .symbol');
  const p1Score = document.querySelector('#player1-info .score span');
  const p2Score = document.querySelector('#player2-info .score span');
  const score1 = document.querySelector("#player1-info .score");
  const score2 = document.querySelector("#player2-info .score");
  
  const winingStatus = document.querySelector(".winning-status");
  const turnContainer = document.querySelector(".message2 .turn");
  const turnInContainer = document.querySelector("span.turn");
  const cellWarning = document.querySelector(".cell-warning");

  resetBtn.addEventListener("click", resetGame);

  function resetGame() {
    winingStatus.classList.add("d-none");
    score1.classList.add("d-none");
    score2.classList.add("d-none");
    gameBoard.resetBoard();
    console.log("GAME RESET!");
    initGame();
  }


  function renderBoard(board) {
    boardHolder.innerHTML = `<span data-index="0">${board[0] ? board[0] : ''}</span>
      <span data-index="1" class="middle-y">${board[1] ? board[1] : ''}</span>
      <span data-index="2">${board[2] ? board[2] : ''}</span>
      <span data-index="3" class="middle-x">${board[3] ? board[3] : ''}</span>
      <span data-index="4" class="middle-y middle-x">${board[4] ? board[4] : ''}</span>
      <span data-index="5" class="middle-x">${board[5] ? board[5] : ''}</span>
      <span data-index="6">${board[6] ? board[6] : ''}</span>
      <span data-index="7" class="middle-y">${board[7] ? board[7] : ''}</span>
      <span data-index="8">${board[8] ? board[8] : ''}</span>`;
    return boardHolder;
  }

  function renderPlayersInfo(p1, p2) {
    p1NameHolder.textContent = p1.name;
    p1SymbolHolder.textContent = p1.symbol;
    p1Score.textContent = p1.score;

    p2NameHolder.textContent = p2.name;
    p2SymbolHolder.textContent = p2.symbol;
    p2Score.textContent = p2.score;
  }


  function congrats(player) {
    resetButton.classList.remove('d-none');
    turnContainer.classList.add('d-none');
    winingStatus.textContent = `${(player.name)?player.name:player.symbol} is the winner!`;
    winingStatus.classList.remove('d-none');
    score1.classList.remove("d-none");
    score2.classList.remove("d-none");
    player.score += 1;
  }

  function showDraw() {
    resetButton.classList.remove('d-none');
    turnContainer.classList.add('d-none');
    winingStatus.textContent = 'it\'s a draw';
    winingStatus.classList.remove('d-none');
    score1.classList.remove("d-none");
    score2.classList.remove("d-none");
    }

  function showWarning() {
    cellWarning.classList.remove('d-none');

    setTimeout(() => {
      cellWarning.classList.add('d-none');
    }, 3000);
  }

  function updateTurn(player) {
    turnInContainer.textContent = ((player.name)?player.name:player.symbol) + "'s";
  }

  return {
    renderBoard,
    renderPlayersInfo,
    updateTurn,
    showDraw,
    congrats,
    showWarning,
  };
}());
const playerFactory = function (name, symbol) {
  const getName = function () {
    return name;
  };

  const getSymbol = function () {
    return symbol;
  };

  return { getName, getSymbol };
};

function initGame(){
  let player1, player2;
  let player1Name = prompt("Enter Player-1's name: ");
  let player2Name = prompt("Enter Player-2's name: ");
  let player1Symbol = "X", player2Symbol = "O";
  player1 = playerFactory(player1Name, player1Symbol);
  player2 = playerFactory(player2Name, player2Symbol);
  gameBoard.setPlayersInfo(player1, player2);
  const cellWarning = document.querySelector(".cell-warning");
  cellWarning.classList.add("d-none");
}

initGame();