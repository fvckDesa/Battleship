import Ship from './ship';

const BOARD_LENGTH = 10;

function GameBoard(shipsLength) {
    const board = new Array(BOARD_LENGTH).fill(null).map(() => new Array(10).fill(null));
    const shipsLengthArr = [...shipsLength];
    const ships = [];

    function addShip(coord) {
        if(shipsLengthArr.length === 0) {
            throw new Error("all the ships shown have been entered");
        }
        if(isValidCoord(coord, shipsLengthArr[0], board)) {
            const { x, y, axis } = coord;
            const length = shipsLengthArr.shift();
            ships.push(new Ship(length));
            //add Ship on board
            for(let i = 0; i < length; i++) {
                if(axis === "y") board[y + i][x] = { numShip: ships.length - 1, shipPos: i };
                if(axis === "x") board[y][x + i] = { numShip: ships.length - 1, shipPos: i };
            }
        }
    }

    function receiveAttack({ x, y }) {
        const attackPos = board[y][x];
        if(attackPos !== null) {
            const { numShip, shipPos } = attackPos;
            ships[numShip].hit(shipPos);
            return true;
        }

        return false;
    }

    function isAllShipsSunk() {
        return ships.every(ship => ship.isSunk());
    }

    return {
        addShip,
        receiveAttack,
        isAllShipsSunk,
        get board() {
            return board;
        }
    }
}

function isValidCoord({ x, y, axis }, length, board) {
    if (
      x < 0 ||
      x >= board.length ||
      y < 0 ||
      y >= board.length ||
      (axis !== "x" && axis !== "y")
    )
      return false;
    for (let i = 0; i < length; i++) {
      if (
        (axis === "y" && (y + i < 0 || y + i > board.length || board[y + i][x] != null)) ||
        (axis === "x" && (x + i < 0 || x + i > board.length || board[y][x + i] != null))
      )
        return false;
    }
    return true;
  }

export default GameBoard;