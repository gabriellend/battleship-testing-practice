import { Ship } from "../Ship/Ship";
import { Gameboard } from "./Gameboard";

describe("Gameboard", () => {
  describe("placeShip", () => {
    let board;
    let patrolBoat;

    beforeEach(() => {
      patrolBoat = new Ship(2);
      board = new Gameboard();
    });

    test("can place ships at specific coords", () => {
      const firstBoatCoords = [
        [0, 0],
        [0, 1],
      ];
      board.placeShip(patrolBoat, firstBoatCoords);
      expect(board.ships).toContain(patrolBoat);

      const secondBoatCoords = [
        [0, 1],
        [0, 2],
        [0, 3],
      ];
      const submarine = new Ship(3);
      expect(() => board.placeShip(submarine, secondBoatCoords)).toThrow(
        "Cannot place a ship on top of another ship."
      );
    });
    test("throws an error if ship length does not match number of coords", () => {
      const calledWithTooManyCoords = () =>
        board.placeShip(patrolBoat, [
          [0, 7],
          [0, 8],
          [0, 9],
        ]);
      expect(calledWithTooManyCoords).toThrow(
        "Ship length must match number of coordinates"
      );
    });
    test("throws an error if coords are off the board", () => {
      const calledWithOffBoardCoords = () =>
        board.placeShip(patrolBoat, [
          [0, 9],
          [0, 10],
        ]);
      expect(calledWithOffBoardCoords).toThrow("Coordinate is out of bounds");
    });
    test("throws an error if coords are already occupied", () => {
      board.placeShip(patrolBoat, [
        [0, 1],
        [0, 2],
      ]);

      const submarine = new Ship(3);
      const calledWithAlreadyUsedCoords = () =>
        board.placeShip(submarine, [
          [0, 0],
          [0, 1],
          [0, 2],
        ]);
      expect(calledWithAlreadyUsedCoords).toThrow(
        "Cannot place a ship on top of another ship."
      );
    });
  });

  describe("receiveAttack", () => {
    let board;
    let patrolBoat;
    const boatCoords = [
      [0, 0],
      [0, 1],
    ];

    beforeEach(() => {
      patrolBoat = new Ship(2);
      board = new Gameboard();
    });

    test("returns true if there is a hit", () => {
      const attackCoords = [0, 0];
      board.placeShip(patrolBoat, boatCoords);
      expect(board.receiveAttack(attackCoords)).toBe(true);
    });
    test("returns false if there is a miss", () => {
      const attackCoords = [0, 2];
      board.placeShip(patrolBoat, boatCoords);
      expect(board.receiveAttack(attackCoords)).toBe(false);
    });
    test("throws an error if a ship is already hit", () => {
      const attack1Coords = [0, 0];
      const attack2Coords = [0, 1];

      board.placeShip(patrolBoat, boatCoords);
      board.receiveAttack(attack1Coords);
      board.receiveAttack(attack2Coords);
      expect(() => board.receiveAttack(attack1Coords)).toThrow();
    });
  });
});
