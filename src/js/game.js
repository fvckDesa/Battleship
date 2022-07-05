import GameBoard from "./gameboard";
import Player from "./player";
import elements from "./DOM/elements";
import * as DOMBoard from "./DOM/DOMboard";
import * as winnerBanner from "./DOM/winnerBanner";

const NUM_SHIPS = 5;
const SHIPS_LENGTH = [5, 4, 3, 3, 2];

const Game = (() => {
  let gameBoard1, gameBoard2, player, computer;

  function start() {
    gameBoard1 = GameBoard(NUM_SHIPS);
    gameBoard2 = GameBoard(NUM_SHIPS);
    player = Player();
    computer = Player();

    // generate random coords for ships
    for(const length of SHIPS_LENGTH) {
      gameBoard1.addShip(player.randomShipCoord(gameBoard1.board, length), length);
      gameBoard2.addShip(computer.randomShipCoord(gameBoard2.board, length), length);
    }
    //render board1 and board2
    DOMBoard.renderBoard("#board1");
    DOMBoard.renderBoard("#board2");
    // render ships on board 1
    DOMBoard.renderShip(elements.cellGameBoard1, gameBoard1.board);
    // dom attack board
    DOMBoard.attackBoard(elements.cellGameBoard2, gameBoard2, computer, gameBoard1);
  }

  function gameOver() {
    if(!gameBoard1.everyShipsSunk() && !gameBoard2.everyShipsSunk()) return false;

    const winner = gameBoard1.everyShipsSunk() ? "Computer" : "Player";

    winnerBanner.renderWinnerBanner(winner);

    return true;
  }

  return {
    start,
    gameOver
  }
})();

export default Game;


