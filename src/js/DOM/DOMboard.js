import Game from "../game";
import elements from "./elements";

function renderBoard(containerId) {
  const NUM_CELLS = 100;
  const nodes = [];

  for(let i = 0; i < NUM_CELLS; i++) {
    const cell = document.createElement("div");
    cell.classList.add("board-cell");
    nodes.push(cell);
  }

  document.querySelector(containerId).replaceChildren(...nodes);
}

function renderAllShip(DOMBoard, board) {
  for(let i = 0; i < 5; i++) {
    renderShip(DOMBoard, board, i);
  }
}

function renderShip(DOMBoard, board, numShip) {
  for (const i in board) {
    for (const j in board[0]) {
      if (board[i][j]?.numShip === numShip) {
        DOMBoard[Number(i + j)].classList.add("ship");
      }
    }
  }
}

function attackBoard(DOMBoard, gameBoard, computer, computerGameBoard) {
  DOMBoard.forEach((cell, i) => {
    cell.addEventListener("click", () => {
        if(cell.classList.contains("hit") || cell.classList.contains("miss")) return;
        // attack gameBoard
        let coords = { x: i % 10, y: Math.floor(i / 10) }
        renderAttack(cell, gameBoard.receiveAttack(coords));
        // if new ship sunk in gameBoard render the ship in DOMBoard
        if(gameBoard.isSunk()) {
          renderShip(DOMBoard, gameBoard.board, gameBoard.board[coords.y][coords.x].numShip);
        }
        if(Game.gameOver()) return;
        // computer attack opposite board
        coords = computer.randomAttack();
        renderAttack(elements.cellGameBoard1[coords.x + coords.y * 10], computerGameBoard.receiveAttack(coords));
    });
  });
}

function renderAttack(cell, attackResult) {
  if (attackResult) {
    cell.classList.add("hit");
  } else {
    cell.classList.add("miss");
  }
  Game.gameOver();
}

export { renderAllShip, attackBoard, renderAttack, renderBoard };
