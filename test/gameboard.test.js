import GameBoard from "../src/js/gameboard";

const shipCoords = [
  { x: 0, y: 0, axis: "y" },
  { x: 2, y: 2, axis: "x" },
  { x: 2, y: 6, axis: "y" },
  { x: 7, y: 7, axis: "x" },
  { x: 4, y: 4, axis: "x" },
];
const lengthArr = [5, 4, 3, 3, 2];

function generateAllCoordsOfShip() {
  const coords = [];
  const length = [5, 4, 3, 3, 2];
  shipCoords.forEach((coord, index) => {
    for (let i = 0; i < length[index]; i++) {
      if (coord.axis === "y") {
        coords.push({ x: coord.x, y: coord.y + i });
      } else {
        coords.push({ x: coord.x + i, y: coord.y });
      }
    }
  });
  return coords;
}

describe("add ship on board", () => {
  const gameBoard = GameBoard(lengthArr);
  const expected = [
    [
      { numShip: 0, shipPos: 0 },
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    [
      { numShip: 0, shipPos: 1 },
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    [
      { numShip: 0, shipPos: 2 },
      null,
      { numShip: 1, shipPos: 0 },
      { numShip: 1, shipPos: 1 },
      { numShip: 1, shipPos: 2 },
      { numShip: 1, shipPos: 3 },
      null,
      null,
      null,
      null,
    ],
    [
      { numShip: 0, shipPos: 3 },
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    [
      { numShip: 0, shipPos: 4 },
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
  ];

  test("valid ship", () => {
    gameBoard.addShip({ x: 0, y: 0, axis: "y" });
    gameBoard.addShip({ x: 2, y: 2, axis: "x" });
    expect(gameBoard.board).toEqual(expected);
  });

  test("invalid ship board", () => {
    gameBoard.addShip({ x: 0, y: 0, axis: "x" });
    gameBoard.addShip({ x: 9, y: 8, axis: "x" });
    gameBoard.addShip({ x: -6, y: 6, axis: "y" });
    expect(gameBoard.board).toEqual(expected);
  });

  test("error if you add more ships than those passed as a parameter", () => {
    gameBoard.addShip({ x: 2, y: 6, axis: "y" });
    gameBoard.addShip({ x: 7, y: 7, axis: "x" });
    gameBoard.addShip({ x: 4, y: 4, axis: "x" });
    expect(() => gameBoard.addShip({ x: 9, y: 0, axis: "x" })).toThrow(Error);
  });
});

let board;

beforeEach(() => {
  board = GameBoard(lengthArr);
  shipCoords.forEach(coord => board.addShip(coord));
});

describe("receiveAttack method", () => {
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
  const allCoordsShip = generateAllCoordsOfShip();
  allCoordsShip.forEach((coord) => board.receiveAttack(coord));

  expect(board.isAllShipsSunk()).toBe(true);
});
