import { Ship } from "../Ship/Ship";
import { S } from "../constants";

export class Gameboard {
  static BOARD_SIZE = 10;
  #board;

  constructor() {
    this.#board = this.initialize();
  }

  initialize() {
    return Array(Gameboard.BOARD_SIZE)
      .fill()
      .map(() => Array(Gameboard.BOARD_SIZE).fill("~"));
  }

  placeShip(ship, coords) {
    if (ship.length !== coords.length) {
      throw new Error("Ship length must match number of coordinates");
    }

    let boardCopy = this.#board.slice();

    for (const [row, col] of coords) {
      if (!this.#board[row][col]) {
        throw new Error("Coordinate is out of bounds");
      }

      if (this.#board[row][col] === S) {
        throw new Error("Cannot place a ship on top of another ship.");
      }
    }

    for (const [row, col] of coords) {
      boardCopy[row][col] = S;
    }
  }

  receiveAttack(coor1, coor2) {}
}
