import Player from "./player";
import elements from "./DOM/elements";
import * as DOMBoard from "./DOM/DOM-board";
import * as winnerBanner from "./DOM/winnerBanner";

const SHIPS_LENGTH = [5, 4, 3, 3, 2];

const Game = (() => {
  let player, computer;

  function start() {
    // create new instances of gameboard and player
    player = Player(SHIPS_LENGTH);
    computer = Player(SHIPS_LENGTH);
    // generate random coords for ships
    player.setRandomShips();
    computer.setRandomShips();
    //render board1 and board2
    DOMBoard.renderBoard(elements.board1);
    DOMBoard.renderBoard(elements.board2);
    // render ships on board 1
    DOMBoard.renderAllShip(elements.cellGameBoard1, player.gameBoard.board);
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
    gameOver
  }
})();

export default Game;


