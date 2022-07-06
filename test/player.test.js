import Player from "../src/js/player";
import GameBoard from "../src/js/gameboard";

const shipsLength = [5, 4, 3, 3, 2];

describe("set ships", () => {
  const player = Player(shipsLength);

  test("test 1", () => {
    const shipCoords = [
      { x: 0, y: 0, axis: "y" },
      { x: 2, y: 2, axis: "x" },
      { x: 2, y: 6, axis: "y" },
      { x: 7, y: 7, axis: "x" },
      { x: 4, y: 4, axis: "x" },
    ];

    const testGameBoard = GameBoard(shipsLength.length);
    shipCoords.forEach((coord, i) =>
      testGameBoard.addShip(coord, shipsLength[i])
    );

    player.setShips(shipCoords);

    expect(player.gameBoard.board).toEqual(testGameBoard.board);
  });

  test("test 2", () => {
    //TODO test with other coords
    const shipCoords = [
      { x: 0, y: 0, axis: "y" },
      { x: 2, y: 2, axis: "x" },
      { x: 2, y: 6, axis: "y" },
      { x: 7, y: 7, axis: "x" },
      { x: 4, y: 4, axis: "x" },
    ];

    const testGameBoard = GameBoard(shipsLength.length);
    shipCoords.forEach((coord, i) =>
      testGameBoard.addShip(coord, shipsLength[i])
    );

    player.setShips(shipCoords);

    expect(player.gameBoard.board).toEqual(testGameBoard.board);
  });
});

describe("set random ships", () => {
  const player = Player(shipsLength);

  test("test 1", () => {
    const randomCoords = player.setRandomShips();
    const gameBoard = GameBoard(shipsLength.length);
    for (const i in randomCoords) {
      expect(gameBoard.addShip(randomCoords[i], shipsLength[i])).toBe(true);
    }
  });

  test("test 2", () => {
    const randomCoords = player.setRandomShips();
    const gameBoard = GameBoard(shipsLength.length);
    for (const i in randomCoords) {
      expect(gameBoard.addShip(randomCoords[i], shipsLength[i])).toBe(true);
    }
  });
});

describe("Test set ship error", () => {
  const coordsArr = [
    { x: 0, y: 0, axis: "y" },
    { x: 2, y: 2, axis: "x" },
    { x: 2, y: 6, axis: "y" },
  ];

  test("num of length greater num of ships coords cause error", () => {
    const player = Player([5, 3, 2, 1, 1]);
    expect(() => player.setShips(coordsArr)).toThrow(Error);
  });

  test("num of ships coords greater num of length cause error", () => {
    const player = Player([5]);
    expect(() => player.setShips(coordsArr)).toThrow(Error);
  });
});

describe("Test random attack", () => {
  test("generate max 100 random attack", () => {
    const player = Player();
    const attackStack = [];
    for (let i = 0; i < 100; i++) {
      attackStack.push(player.randomAttack());
    }
    expect(attackStack.length).toBe(100);
    expect(() => player.randomAttack()).toThrow(Error);
  });

  test("generate 100 different random attack", () => {
    const player = Player();
    const attackStack = [];
    for (let i = 0; i < 100; i++) {
      const attackCoords = player.randomAttack();
      expect(
        attackStack.find(
          (el) => el.x === attackCoords.x && el.y === attackCoords.y
        )
      ).toBe(undefined);
      attackStack.push(attackCoords);
    }
    expect(attackStack.length).toBe(100);
  });
});
