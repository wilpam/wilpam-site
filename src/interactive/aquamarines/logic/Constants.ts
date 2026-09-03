import { Position } from "../types/Position"
import { BoardState } from "./BoardState"
import { PieceState } from "./PieceState"

export const boardSize = 6
export const handSize = 6

export const initialPieces = new BoardState([
  new PieceState(true, true, new Position(1, 1)),
  new PieceState(false, true, new Position(4, 4)),
],
  handSize,
  handSize,
  true,
  false
)

export const piece_base_position = [0,176];
export const piece_x_vector = [35,-35];
export const piece_y_vector = [-35,-35];

export const white_hand_base_position = [-213,-213+248]
export const black_hand_base_position = [ 213, 213-248]
export const flag_base_position = [-213,-213]