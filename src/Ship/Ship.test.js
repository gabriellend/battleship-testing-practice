import { Ship } from "./Ship";

describe("Ship", () => {
  describe("constructor", () => {
    test("constructor throws an error if length is not a positive integer", () => {
      expect(() => new Ship(-1)).toThrow("Length must be a positive integer.");
      expect(() => new Ship(0)).toThrow("Length must be a positive integer.");
      expect(() => new Ship(3.5)).toThrow("Length must be a positive integer.");
      expect(() => new Ship("three")).toThrow(
        "Length must be a positive integer"
      );
    });
  });

  describe("hit", () => {
    let submarine;

    beforeEach(() => {
      submarine = new Ship(3);
    });

    test("hit method increases numHits by one", () => {
      submarine.hit();
      expect(submarine.numHits).toBe(1);
    });
    test("throws error if hit is called on a sunk ship", () => {
      submarine.hit();
      submarine.hit();
      submarine.hit();
      expect(() => submarine.hit()).toThrow("Ship is already sunk!");
    });
  });

  describe("isSunk", () => {
    let submarine;

    beforeEach(() => {
      submarine = new Ship(3);
    });

    test("isSunk reports ship not sunk after one hit", () => {
      submarine.hit();
      expect(submarine.isSunk).toBe(false);
    });
    test("isSunk reports ship sunk after sufficient hits", () => {
      submarine.hit();
      submarine.hit();
      submarine.hit();
      expect(submarine.isSunk).toBe(true);
    });
  });
});
