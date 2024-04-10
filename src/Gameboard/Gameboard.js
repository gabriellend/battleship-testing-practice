import { Ship } from "../Ship/Ship";

export class Gameboard {
  #board;

  constructor() {
    this.#board = init();
  }

  receiveAttack(coor1, coor2) {}
}
