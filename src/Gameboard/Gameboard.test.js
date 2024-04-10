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
      board.placeShip(patrolBoat, [
        [0, 0],
        [0, 1],
      ]);
      expect();
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

  describe("receiveAttack", () => {});
});
