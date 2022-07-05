import Game from "../game";
import elements from "./elements";

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
    cell.onclick = () => {
        if(cell.classList.contains("hit") || cell.classList.contains("miss")) return;
        renderAttack(cell, gameBoard.receiveAttack({ x: i % 10, y: Math.floor(i / 10) }));
        if(Game.gameOver()) return;
        const coords = computer.randomAttack();
        renderAttack(elements.cellGameBoard1[coords.x + coords.y * 10], computerGameBoard.receiveAttack(coords));
    };
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

function clearBoard() {
  const { cellGameBoard1, cellGameBoard2 } = elements;
  for (const cell of [...cellGameBoard1, ...cellGameBoard2]) {
    cell.classList.remove("hit", "miss", "ship");
    cell.onclick = () => {};
  }
}

export { renderShip, attackBoard, renderAttack, clearBoard };
