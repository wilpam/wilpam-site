import React, { useRef, useState } from "react";
import { PieceState } from "./logic/PieceState";
import { Piece } from "./Piece";
import { Highlight } from "./Highlight";
import "./Board.css";
import type { Position } from "./types/Position";
import { BoardState } from "./logic/BoardState";
import { availableSpaces, doPhase, movePiece } from "./logic/Logic";
import { HandPiece } from "./HandPiece";
import { Flag } from "./Flag";

interface Props {
  boardState: BoardState;
}

export function Board({ boardState }: Props) {

  const [activePieceState, setActivePieceState] = useState<PieceState | null>(null)
  const [isPlacing, setIsPlacing] = useState<boolean>(false);
  const boardRef = useRef<HTMLDivElement>(null);

  const singleplayer = true;
  let isWhite = true;

  let board = [];
  let pieces = boardState.pieces

  let whiteHand = boardState.whiteHand
  let blackHand = boardState.blackHand

  for (let i = 0; i < pieces.length; i++) {
    let piece = pieces[i]
    board.push(<Piece key={i} white={piece.white} commander={piece.commander} position={piece.position} onClick={pieceClicked} />)
  }

  function backgroundClicked(e: React.MouseEvent) {
    setActivePieceState(null)
    setIsPlacing(false);
  }

  function pieceClicked(e: React.MouseEvent, position: Position) {
    //alert(`clicked piece at ${position.x},${position.y}`)
    let piece = pieces.find((piece) => piece.position == position)
    if (piece == null) {
      return;
    }
    if (piece == activePieceState) {
      setActivePieceState(null);
      setIsPlacing(false);
      return;
    }
    if (isWhite != piece.white && !singleplayer) {
      return;
    }
    if (piece.white == boardState.whiteTurn) {
      setActivePieceState(piece);
    }
  }

  function highlightClicked(e: React.MouseEvent, piece: PieceState, position: Position){
    if (isWhite != piece.white && !singleplayer) {
      return;
    }
    if (isPlacing) {
      if (boardState.whiteTurn) {
        boardState.whiteHand -= 1;
      } else {
        boardState.blackHand -= 1;
      }
      boardState.pieces.push(new PieceState(boardState.whiteTurn, false, position));
      setIsPlacing(false);
      doPhase(boardState);
    } else if (activePieceState != null) {
      movePiece(activePieceState, boardState, position);
    }
    setActivePieceState(null);
  }

  function handPieceClicked(e: React.MouseEvent, white: boolean){
    if (white != boardState.whiteTurn) {
      return
    }
    if (isWhite != boardState.whiteTurn && !singleplayer) {
      return;
    }
    let piece = pieces.find((piece) => piece.white == boardState.whiteTurn && piece.commander);
    if (piece != null) {
      setActivePieceState(piece);
      setIsPlacing(true);
    }
  }

  let highlights = [];
  if (activePieceState != null) {
    let highlightSpaces = availableSpaces(activePieceState, boardState);
    for (let i = 0; i < highlightSpaces.length; i++) {
      let space = highlightSpaces[i];
      highlights.push(<Highlight key={i} piece={activePieceState} position={space} onClick={highlightClicked} />);
    }
  }

  let hands = [];
  for (let i = 0; i < whiteHand; i++)
    hands.push(<HandPiece key={i} index={i} white={true} commander={false} onClick={handPieceClicked}></HandPiece>)
  for (let i = 0; i < blackHand; i++)
    hands.push(<HandPiece key={i+10} index={i} white={false} commander={false} onClick={handPieceClicked}></HandPiece>)

  return (
    <div id="board">
      <img id="board-img" src="/aquamarines/board.png" draggable="false" onClick={backgroundClicked} />
      <Flag white={boardState.whiteTurn} secondPhase={boardState.secondPhase}></Flag>
      {board}
      {highlights}
      {hands}
    </div>
  );
}

