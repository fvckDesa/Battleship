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

function renderShip(DOMBoard, board) {
  for (const i in board) {
    for (const j in board[0]) {
      if (board[i][j] != null) {
        DOMBoard[Number(i + j)].classList.add("ship");
      }
    }
  }
}

function attackBoard(DOMBoard, gameBoard, computer, computerGameBoard) {
  DOMBoard.forEach((cell, i) => {
    cell.addEventListener("click", () => {
        if(cell.classList.contains("hit") || cell.classList.contains("miss")) return;
        renderAttack(cell, gameBoard.receiveAttack({ x: i % 10, y: Math.floor(i / 10) }));
        if(Game.gameOver()) return;
        const coords = computer.randomAttack();
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

export { renderShip, attackBoard, renderAttack, renderBoard };
