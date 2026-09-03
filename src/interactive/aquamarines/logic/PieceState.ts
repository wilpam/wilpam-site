import { Position } from "../types/Position";

export class PieceState {
  white: boolean;
  commander: boolean;
  position: Position;

  constructor(white: boolean, commander: boolean, position: Position){
    this.white = white;
    this.commander = commander;
    this.position = position;
  }

  opposes(otherPiece: PieceState) {
    return otherPiece.white != this.white
  }

}