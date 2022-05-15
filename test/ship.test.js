import Ship from '../src/js/ship';

describe("return object", () => {
    test("check return object property", () => {
        const expected = {
            length: 3,
            hitPoints: [false, false, false]
        };
        expect(Ship(3)).toMatchObject(expected);
    });
    
    test("length must be between 1 and 5", () => {
        expect(() => Ship(7)).toThrow();
        expect(() => Ship(-3)).toThrow();
    });
    
    test("length and hitPoints arr must have equal length", () => {
        expect(Ship(4).hitPoints.length).toBe(4);
        expect(Ship(2).hitPoints.length).toBe(2);
    });
    
    test("have a hit method", () => {
        expect(Ship(3).hit instanceof Function).toBeTruthy();
    });
    
    test("have a isSunk method", () => {
        expect(Ship(3).isSunk instanceof Function).toBeTruthy();
    });
});

describe("test hit method", () => {
    test("one hit 1", () => {
        const ship = Ship(3);
        ship.hit(2);
        expect(ship.hitPoints).toEqual([false, false, true]);
    });

    test("one hit 2", () => {
        const ship = Ship(5);
        ship.hit(0);
        expect(ship.hitPoints).toEqual([true, false, false, false, false]);
    });

    test("one hit 3", () => {
        const ship = Ship(4);
        ship.hit(1);
        expect(ship.hitPoints).toEqual([false, true, false, false]);
    });

    test("multi hit 1", () => {
        const ship = Ship(3);
        ship.hit(2);
        ship.hit(1);
        expect(ship.hitPoints).toEqual([false, true, true]);
    });

    test("multi hit 2", () => {
        const ship = Ship(5);
        ship.hit(0);
        ship.hit(4);
        ship.hit(2);
        expect(ship.hitPoints).toEqual([true, false, true, false, true]);
    });

    test("multi hit 3", () => {
        const ship = Ship(4);
        ship.hit(1);
        ship.hit(2);
        ship.hit(3);
        expect(ship.hitPoints).toEqual([false, true, true, true]);
    });
});

describe("test isSunk method", () => {
    test("sunk", () => {
        const ship = Ship(3);
        ship.hit(0);
        ship.hit(1);
        ship.hit(2);
        console.log(ship.hitPoints);
        expect(ship.isSunk()).toBe(true);
    });

    test("not sunk", () => {
        const ship = Ship(4);
        ship.hit(0);
        ship.hit(1);
        ship.hit(2);
        expect(ship.isSunk()).toBe(false);
    });
});