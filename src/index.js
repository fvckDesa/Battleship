import './style.css';

import GameBoard from './js/gameboard';
import Player from'./js/player';
import * as DOM from './js/dom';
import { coordsFromIndex, indexFromCoords } from './js/utility';

const coordsShip = [
    { x: 0, y: 0, axis: "y" },
    { x: 2, y: 2, axis: "x" },
    { x: 2, y: 6, axis: "y" },
    { x: 7, y: 7, axis: "x" },
    { x: 4, y: 4, axis: "x" }
];

const dialog = document.querySelector("dialog");
const computerBoard = [...document.querySelectorAll("#computer-board>.square")];
const playerBoard = [...document.querySelectorAll("#player-board>.square")];

let computer, board1, board2;

startGame();

dialog.addEventListener("close", startGame);

computerBoard.forEach((square, i) => {
    square.addEventListener("click", () => {
        if(
            square.classList.contains("there-is-ship") ||
            square.classList.contains("there-is-not-ship")
        ) return;
        
        const coords = coordsFromIndex(i);
        const attackResult = board2.receiveAttack(coords);

        DOM.printAttack(square, attackResult);

        board2.coordShipSunk && DOM.shipSunk(board2.coordShipSunk);

        if(board2.isAllShipsSunk()) {
            DOM.showWinnerDialog("player1");
            return;
        }

        const computerCoords = computer.getCoords();

        const attackComputerResult = board1.receiveAttack(computerCoords);

        const index = indexFromCoords(computerCoords);

        DOM.printAttack(playerBoard[index], attackComputerResult);

        if(board1.isAllShipsSunk()) {
            DOM.showWinnerDialog("computer");
            return;
        }
    });
});

function startGame() {
    computer = Player();
    board1 = GameBoard(coordsShip);
    DOM.renderShips(board1.board);
    board2 = GameBoard(computer.coordsShips);
}