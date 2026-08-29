import { Position } from "../types/Position"
import { BoardState } from "./BoardState"
import { PieceState } from "./PieceState"

export const initialPieces = new BoardState([
  new PieceState(true, true, new Position(1, 1)),
  new PieceState(false, true, new Position(4, 4)),
])

export const handSize = 5