import './style.css';

import GameBoard from './js/gameboard';
import Player from'./js/player';
import * as DOM from './js/dom';

DOM.renderWinner("player");

const coordsShip = [
    { x: 0, y: 0, axis: "y" },
    { x: 2, y: 2, axis: "x" },
    { x: 2, y: 6, axis: "y" },
    { x: 7, y: 7, axis: "x" },
    { x: 4, y: 4, axis: "x" }
];

const computer = Player();
const board1 = GameBoard(coordsShip);
const board2 = GameBoard(computer.coordsShips);

const computerBoard = [...document.querySelectorAll("#computer-board>.square")];
const playerBoard = [...document.querySelectorAll("#player-board>.square")];

computerBoard.forEach((square, i) => {
    square.addEventListener("click", () => {
        if(
            square.classList.contains("there-is-ship") ||
            square.classList.contains("there-is-not-ship")
        ) return;
        
        const coords = i.toString().padStart(2, "0");
        const attackResult = board2.receiveAttack({ x: +coords[1], y: +coords[0] });

        if(attackResult) {
            square.classList.add("there-is-ship");
        } else {
            square.classList.add("there-is-not-ship");
        }

        if(board2.isAllShipsSunk()) {
            console.log("player win");
            return;
        }

        const computerCoords = computer.getCoords();

        const attackComputerResult = board1.receiveAttack(computerCoords);

        const index = Number(computerCoords.y.toString() + computerCoords.x.toString());

        if(attackComputerResult) {
            playerBoard[index].classList.add("there-is-ship");
        } else {
            playerBoard[index].classList.add("there-is-not-ship");
        }

        if(board1.isAllShipsSunk()) {
            console.log("computer win");
            return;
        }
    });
});