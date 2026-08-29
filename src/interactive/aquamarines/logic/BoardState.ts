import { PieceState } from "./PieceState";

export class BoardState {

  pieces: PieceState[];

  constructor(pieces: PieceState[]) {
    this.pieces = pieces;
  }

  clone(): BoardState {
    return new BoardState(
      this.pieces
    )
  }
}