import GameBoard from "../src/js/gameboard";

const coordsShip = [
    { x: 0, y: 0, axis: "y" },
    { x: 2, y: 2, axis: "x" },
    { x: 2, y: 6, axis: "y" },
    { x: 7, y: 7, axis: "x" },
    { x: 4, y: 4, axis: "x" }
];

function generateAllCoordsOfShip() {
    const coords = [];
    const length = [5, 4, 3, 3, 2];
    coordsShip.forEach((coord, index) => {
        for(let i = 0; i < length[index]; i++) {
            if(coord.axis === "y") {
                coords.push({ x: coord.x, y: coord.y + i });
            } else {
                coords.push({ x: coord.x + i, y: coord.y });
            }
        }
    })
    return coords;
}

describe("receiveAttack method", () => {
    const board = GameBoard(coordsShip);
    
    test("attack hit", () => {
        expect(board.receiveAttack({ x: 0, y: 3 })).toBe(true);
        expect(board.receiveAttack({ x: 8, y: 7 })).toBe(true);
    });

    test("attack not hit", () => {
        expect(board.receiveAttack({ x: 2, y: 1 })).toBe(false);
        expect(board.receiveAttack({ x: 6, y: 5 })).toBe(false);
    });
});

test("check if all ships are sunk", () => {
    const board = GameBoard(coordsShip);
    const allCoordsShip = generateAllCoordsOfShip();
    allCoordsShip.forEach(coord => board.receiveAttack(coord));

    expect(board.isAllShipsSunk()).toBe(true);
});