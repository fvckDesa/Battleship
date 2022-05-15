import Ship from './ship';

const BOARD_LENGTH = 10;
const NUM_SHIPS = 5;
const shipsLength = [5, 4, 3, 3, 2];

function GameBoard(shipsCoords) {
    
    /* matrix of null value*/  /* eslint-disable-next-line */
    const board = new Array(BOARD_LENGTH).fill(null).map(pos => new Array(10).fill(null));
    /* array of ships  */
    const ships = new Array(NUM_SHIPS).fill(null).map((pos, i) => new Ship(shipsLength[i]));

    _setBoard();

    function receiveAttack({ x, y }) {
        const attackPos = board[y][x];
        if(attackPos !== null) {
            const { numShip, pos } = attackPos;
            ships[numShip].hit(pos);
            return true;
        } else {
            return false;
        }
    }

    function isAllShipsSunk() {
        return ships.every(ship => ship.isSunk);
    }

    function _setBoard() {
        shipsCoords.forEach((coord, numShip) => {
            const { x, y, axis } = coord;
            for(let i = 0; i < shipsLength[numShip]; i++) {
                if(axis === "y") {
                    board[y + i][x] = { numShip, pos: i };
                } else {
                    board[y][x + i] = { numShip, pos: i };
                }
            }
        });
    }

    return {
        receiveAttack,
        isAllShipsSunk
    }
}

export default GameBoard;