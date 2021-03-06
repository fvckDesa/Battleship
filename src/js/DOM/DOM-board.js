import Game from "../game";
import elements from "./elements";
import { delay } from "../utility";

function renderBoard(DOMBoard) {
  const NUM_CELLS = 100;
  const nodes = [];

  for(let i = 0; i < NUM_CELLS; i++) {
    const cell = document.createElement("div");
    cell.classList.add("board-cell");
    nodes.push(cell);
  }

  DOMBoard.replaceChildren(...nodes);
}

function renderAllShip(BoardCells, board) {
  for(let i = 0; i < 5; i++) {
    renderShip(BoardCells, board, i);
  }
}

function renderShip(BoardCells, board, numShip) {
  for (const i in board) {
    for (const j in board[0]) {
      if (board[i][j]?.numShip === numShip) {
        BoardCells[Number(i + j)].classList.add("ship");
      }
    }
  }
}

function attackBoard(enemyBoardCells, enemyGameBoard, enemy, myGameBoard) {
  enemyBoardCells.forEach((cell, i) => {
    cell.setAttribute("interactive", "true");
    
    cell.addEventListener("click", async () => {
        if(cell.classList.contains("hit") || cell.classList.contains("miss")) return;
        // attack gameBoard
        let coords = { x: i % 10, y: Math.floor(i / 10) }
        renderAttack(cell, enemyGameBoard.receiveAttack(coords));
        // if new ship sunk in gameBoard render the ship in enemy board
        if(enemyGameBoard.isSunk()) {
          const numShipSunk = enemyGameBoard.board[coords.y][coords.x].numShip;
          renderShip(enemyBoardCells, enemyGameBoard.board, numShipSunk);
        }
        if(Game.gameOver()) return;
        await delay(300);
        // enemy attack opposite board
        coords = enemy.randomAttack();
        renderAttack(elements.cellGameBoard1[coords.x + coords.y * 10], myGameBoard.receiveAttack(coords));
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

export { renderShip, renderAllShip, attackBoard, renderAttack, renderBoard };
