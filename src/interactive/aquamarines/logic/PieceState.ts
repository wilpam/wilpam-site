import { Position, type PositionJ } from "../types/Position";

export interface PieceStateJ {
  white: boolean,
  commander: boolean,
  position: PositionJ
}

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

  static remake(json: PieceStateJ) {
    return new PieceState(
      json.white,
      json.commander,
      Position.remake(json.position)
    )
  }
}