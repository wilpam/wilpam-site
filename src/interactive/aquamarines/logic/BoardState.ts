import { PieceState } from "./PieceState";

export class BoardState {

  pieces: PieceState[];
  whiteHand: number;
  blackHand: number;
  whiteTurn: boolean;
  secondPhase: boolean;

  constructor(pieces: PieceState[], whiteHand: number, blackHand: number, whiteTurn: boolean, secondPhase: boolean) {
    this.pieces = pieces;
    this.whiteHand = whiteHand;
    this.blackHand = blackHand;
    this.whiteTurn = whiteTurn;
    this.secondPhase = secondPhase;
  }

  clone(): BoardState {
    return new BoardState(
      this.pieces,
      this.whiteHand,
      this.blackHand,
      this.whiteTurn,
      this.secondPhase
    )
  }

  phase() {
    if (this.secondPhase) {
      this.whiteTurn = !this.whiteTurn;
    }
    this.secondPhase = !this.secondPhase;
  }
}