import { Ship } from "../Ship/Ship";
import { water, hit } from "../constants";

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
      .map(() => Array(Gameboard.BOARD_SIZE).fill(water));
  }

  get ships() {
    return this.#ships;
  }

  #checkIfCoordsOccupied = (row, col) => {
    if (this.#board[row][col] !== water) {
      throw new Error("Cannot place a ship on top of another ship.");
    }
  };

  #checkIfCoordsInBounds = (row, col) => {
    if (!this.#board[row][col]) {
      throw new Error("Coordinate is out of bounds:");
    }
  };

  #checkCoordsAvailable = (coords) => {
    for (const [row, col] of coords) {
      this.#checkIfCoordsInBounds(row, col);
      this.#checkIfCoordsOccupied(row, col);
    }

    return true;
  };

  placeShip(ship, coords) {
    if (ship.length !== coords.length) {
      throw new Error("Ship length must match number of coordinates");
    }

    this.#checkCoordsAvailable(coords);

    for (const [row, col] of coords) {
      this.#board[row][col] = ship.id;
    }

    this.#ships.push(ship);
  }

  receiveAttack([row, col]) {
    this.#checkIfCoordsInBounds(row, col);
    const target = this.#board[row][col];
    if (target === water) {
      return false;
    } else if (target === hit) {
      throw new Error("Target already hit");
    }

    const targetShipID = this.#board[row][col];
    for (const ship of this.#ships) {
      if (ship.id === targetShipID) {
        ship.hit();
        this.#board[row][col] = hit;
        if (ship.isSunk) {
          console.log("You sunk the ship!");
        }
      }
    }

    return true;
  }
}
