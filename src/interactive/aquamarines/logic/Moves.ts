import { PieceState } from "./PieceState"
import { BoardState } from "./BoardState"
import { Position } from "../types/Position"

export class Moves {

  available_spaces(piece: PieceState, boardState: BoardState) {
    var neighbors = [
      piece.position.offset(0,1),
      piece.position.offset(0,-1),
      piece.position.offset(1,0),
      piece.position.offset(-1,0),
    ]

    var spaces: Position[]
    spaces = []

    for (const pos of neighbors) {
      //check if out of bounds
      var found_blocker = false
      for (const otherPiece of boardState.pieces) {
        if (otherPiece.position == pos) {
          found_blocker = true
          break
        }
      }
      if (!found_blocker) {
        spaces.push(pos)
      }
    }

    return spaces
  }

  attackers(piece: PieceState, boardState: BoardState) {
    var neighbors = [
      piece.position.offset(0,1),
      piece.position.offset(0,-1),
      piece.position.offset(1,0),
      piece.position.offset(-1,0),
      piece.position.offset(1,1),
      piece.position.offset(-1,-1),
      piece.position.offset(1,-1),
      piece.position.offset(-1,1),
    ]

    var spaces: Position[]
    spaces = []

    for (const pos of neighbors) {
      //check if out of bounds
      var found_attacker = false
      for (const otherPiece of boardState.pieces) {
        if (otherPiece.position == pos && piece.opposes(otherPiece)) {
          found_attacker = true
          break
        }
      }
      if (found_attacker) {
        spaces.push(pos)
      }
    }

    return spaces
  }

  move_piece(piece: PieceState, position: Position) {
    piece.position = position
  }
}