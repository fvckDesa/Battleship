import { isValidCoord } from "./utility";

function AIPlayer() {
    const coordsList = [];

    function randomShipCoord(board, length) {
        let coord;

        do {
            coord = randomCoords();
            coord.axis = Math.floor(Math.random() * 2) ? "x" : "y";
        } while(!isValidCoord(coord, length, board));

        return coord;
    }

    function randomAttack() {
        if(coordsList.length === 100) {
            throw new Error("Max possible attacks are 100");
        }
        let coord;
        do {
            coord = randomCoords();
        }while(coordsList.find(el => el.x === coord.x && el.y === coord.y));

        coordsList.push(coord);

        return coord;
    }

    return {
        randomShipCoord,
        randomAttack
    };
}

function randomCoords() {
    return {
        x: Math.floor(Math.random() * 10),
        y: Math.floor(Math.random() * 10)
    };
}

export default AIPlayer;
