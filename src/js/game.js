import Player from "./player";
import elements from "./DOM/elements";
import * as DOMBoard from "./DOM/DOM-board";
import * as winnerBanner from "./DOM/winner-banner";
import * as DragAndDrop from "./DOM/drag-and-drop";

const SHIPS_LENGTH = [5, 4, 3, 3, 2];

const Game = (() => {
  let player, computer;

  function start() {
    // create new instances of player
    player = Player(SHIPS_LENGTH);
    computer = Player(SHIPS_LENGTH);
    //render board1 and board2
    DOMBoard.renderBoard(elements.board1);
    DOMBoard.renderBoard(elements.board2);
    // active drag and drop on board1
    DragAndDrop.activeDragAndDrop(elements.boardContainer1, player);
  }

  function loop() {
    computer.setRandomShips();
    // dom attack board
    DOMBoard.attackBoard(elements.cellGameBoard2, computer.gameBoard, computer, player.gameBoard);
  }

  function gameOver() {
    if(!player.gameBoard.everyShipsSunk() && !computer.gameBoard.everyShipsSunk()) return false;

    const winner = player.gameBoard.everyShipsSunk() ? "Computer" : "Player";

    winnerBanner.renderWinnerBanner(winner);

    return true;
  }

  return {
    start,
    loop,
    gameOver
  }
})();

export default Game;


