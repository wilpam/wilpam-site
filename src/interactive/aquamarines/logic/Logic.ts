import { PieceState } from "./PieceState"
import { BoardState } from "./BoardState"
import { Position } from "../types/Position"
import { boardSize } from "./Constants"

export function availableSpaces(piece: PieceState, boardState: BoardState) {
  var neighbors = [
    piece.position.offset(0,1),
    piece.position.offset(0,-1),
    piece.position.offset(1,0),
    piece.position.offset(-1,0),
  ]

  var spaces: Position[]
  spaces = []

  for (const pos of neighbors) {
    if (pos.x < 0 || pos.x >= boardSize ||
        pos.y < 0 || pos.y >= boardSize) {
          continue
    }
    var found_blocker = false
    for (const otherPiece of boardState.pieces) {
      if (otherPiece.position.is(pos)) {
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

export function attackers(piece: PieceState, boardState: BoardState) {
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
      if (otherPiece.position.is(pos) && piece.opposes(otherPiece)) {
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

export function doPhase(board: BoardState) {
  let newBoard = board.clone();
  newBoard.phase();
  let deadPieces = [];
  for (const boardPiece of newBoard.pieces) {
    //also check for no moves here
    if (attackers(boardPiece, newBoard).length >= 3) {
      deadPieces.push(boardPiece);
    }
  }
  newBoard.pieces = newBoard.pieces.filter((p) => (!deadPieces.includes(p)));
  return newBoard
}

export function movePiece(piece: PieceState, board: BoardState, position: Position) {
  let newBoard = board.clone();
  let newPiece = newBoard.pieces.find((p) => p.position == piece.position)
  if (newPiece == null) {
    return board;
  }
  newPiece.position = position;
  return doPhase(newBoard);
}

export function checkGameCondition(board: BoardState) {
  let whiteCommanderDead = !board.pieces.find((p) => p.white && p.commander)
  let blueCommanderDead = !board.pieces.find((p) => !p.white && p.commander)
  if (whiteCommanderDead && blueCommanderDead) {
    return GameCondition.Stalemate;
  }
  else if (whiteCommanderDead) {
    return GameCondition.BlueWins;
  }
  else if (blueCommanderDead) {
    return GameCondition.WhiteWins;
  }
  return GameCondition.Regular
}

export enum GameCondition {
  Regular,
  WhiteWins,
  BlueWins,
  Stalemate
}