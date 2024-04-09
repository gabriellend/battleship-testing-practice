export class Ship {
  #length;
  #numHits;

  constructor(length) {
    this.#length = length;
    this.#numHits = 0;
  }

  hit() {
    this.#numHits++;
  }

  isSunk() {
    return this.#length === this.#numHits;
  }
}
