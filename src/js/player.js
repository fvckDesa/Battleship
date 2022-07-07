import { isValidCoord } from "./utility";
import GameBoard from "./gameboard";

function Player(shipLengthArr = []) {
    const attacksList = [];
    let gameBoard = GameBoard(shipLengthArr.length);

    function randomShipCoord(length) {
        let coord;

        do {
            coord = randomCoords();
            coord.axis = Math.floor(Math.random() * 2) ? "x" : "y";
        } while(!isValidCoord(coord, length, gameBoard.board));

        return coord;
    }

    function randomAttack() {
        if(attacksList.length === 100) {
            throw new Error("Max possible attacks are 100");
        }

        let coord;
        
        do {
            coord = randomCoords();
        }while(attacksList.find(el => el.x === coord.x && el.y === coord.y));

        attacksList.push(coord);

        return coord;
    }

    function setShips(coordsArr) {
        if(coordsArr.length !== shipLengthArr.length) {
            throw new Error("num of coords and num of length must be same");
        }
        gameBoard = GameBoard(shipLengthArr);
        for(const i in coordsArr) {
            gameBoard.addShip(coordsArr[i], shipLengthArr[i]);
        }
    }

    function setRandomShips() {
        gameBoard = GameBoard(shipLengthArr);
        const shipsCoords = [];
        for(const length of shipLengthArr) {
            const coord = randomShipCoord(length);
            shipsCoords.push(coord);
            gameBoard.addShip(coord, length);
        }

        return shipsCoords;
    }

    return {
        setShips,
        setRandomShips,
        randomAttack,
        get gameBoard() {
            return gameBoard;
        },
        shipLengthArr
    };
}

function randomCoords() {
    return {
        x: Math.floor(Math.random() * 10),
        y: Math.floor(Math.random() * 10)
    };
}

export default Player;
