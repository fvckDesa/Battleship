import Ship from "./ship";
import { isValidCoord } from "./utility";

const BOARD_LENGTH = 10;

function GameBoard(numShips) {
  const board = new Array(BOARD_LENGTH)
    .fill(null)
    .map(() => new Array(10).fill(null));
  const ships = [];

  function addShip(coord, length) {
    if (ships.length === numShips) {
      throw new Error("all the ships shown have been entered");
    }
    if (!isValidCoord(coord, length, board)) {
      return false;
    }
    const { x, y, axis } = coord;
    ships.push(new Ship(length));
    //add Ship on board
    for (let i = 0; i < length; i++) {
      if (axis === "y")
        board[y + i][x] = { numShip: ships.length - 1, shipPos: i };
      if (axis === "x")
        board[y][x + i] = { numShip: ships.length - 1, shipPos: i };
    }
    return true;
  }

  function receiveAttack({ x, y }) {
    const attackPos = board[y][x];
    if (attackPos !== null) {
      const { numShip, shipPos } = attackPos;
      ships[numShip].hit(shipPos);
      return true;
    }

    return false;
  }

  function isAllShipsSunk() {
    return ships.every((ship) => ship.isSunk());
  }

  return {
    addShip,
    receiveAttack,
    isAllShipsSunk,
    get board() {
      return board;
    },
  };
}

export default GameBoard;
