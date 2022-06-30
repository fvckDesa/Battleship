import AIPlayer from "../src/js/player";
import GameBoard from "../src/js/gameboard";

const shipsLength = [5, 4, 3, 3, 2];

describe("Test random ship coordinates generator", () => {
  for (let i = 1; i <= 15; i++) {
    const gameBoard = GameBoard(5);
    const player = AIPlayer();
    test("generate random coords" + i, () => {
      for (const length of shipsLength) {
        const coord = player.randomShipCoord(gameBoard.board, length);
        expect(gameBoard.addShip(coord, length)).toBe(true);
      }
    });
  }
});

describe("Test random attack", () => {
    test("generate max 100 random attack", () => {
        const player = AIPlayer();
        const attackStack = [];
        for(let i = 0; i < 100; i++) {
            attackStack.push(player.randomAttack());
        }
        expect(attackStack.length).toBe(100);
        expect(() => player.randomAttack()).toThrow(Error);
    });

    test("generate 100 different random attack", () => {
        const player = AIPlayer();
        const attackStack = [];
        for(let i = 0; i < 100; i++) {
            const attackCoords = player.randomAttack();
            expect(attackStack.find(el => el.x === attackCoords.x && el.y === attackCoords.y)).toBe(undefined);
            attackStack.push(attackCoords);
        }
        expect(attackStack.length).toBe(100);
    });
});