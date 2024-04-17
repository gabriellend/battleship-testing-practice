export class Ship {
  static #shipID = 0;
  #length;
  #numHits;
  #id;

  constructor(length) {
    if (!Number.isInteger(length) || length <= 0) {
      throw new Error("Length must be a positive integer.");
    }
    this.#length = length;
    this.#numHits = 0;
    this.#id = ++Ship.#shipID;
  }

  hit() {
    if (this.isSunk) {
      throw new Error("Ship is already sunk!");
    }

    this.#numHits++;
  }

  get numHits() {
    return this.#numHits;
  }

  get isSunk() {
    return this.#length === this.#numHits;
  }

  get length() {
    return this.#length;
  }

  get id() {
    return this.#id;
  }
}
