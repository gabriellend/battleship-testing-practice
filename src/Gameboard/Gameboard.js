import { Ship } from "../Ship/Ship";
import { S } from "../constants";

export class Gameboard {
  static BOARD_SIZE = 10;
  #board;
  #ships;

  constructor() {
    this.#board = this.initialize();
    this.#ships = [];
  }

  initialize() {
    return Array(Gameboard.BOARD_SIZE)
      .fill()
      .map(() => Array(Gameboard.BOARD_SIZE).fill("~"));
  }

  get ships() {
    return this.#ships;
  }

  checkCoordsAvailable = (coords) => {
    for (const [row, col] of coords) {
      if (!this.#board[row][col]) {
        throw new Error("Coordinate is out of bounds");
      }

      if (this.#board[row][col] === S) {
        throw new Error("Cannot place a ship on top of another ship.");
      }
    }

    return true;
  };

  placeShip(ship, coords) {
    if (ship.length !== coords.length) {
      throw new Error("Ship length must match number of coordinates");
    }

    const areCoordsAvailable = this.checkCoordsAvailable(coords);
    if (areCoordsAvailable) {
      for (const [row, col] of coords) {
        this.#board[row][col] = S;
      }

      this.#ships.push(ship);
    }
  }

  receiveAttack(coor1, coor2) {}
}
