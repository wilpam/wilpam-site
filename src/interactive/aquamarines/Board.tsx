import React, { useEffect, useRef, useState } from "react";
import { PieceState } from "./logic/PieceState";
import { Piece } from "./Piece";
import { Highlight } from "./Highlight";
import "./Board.css";
import type { Position } from "./types/Position";
import { BoardState } from "./logic/BoardState";
import { availableSpaces, checkGameCondition, doPhase, GameCondition, movePiece } from "./logic/Logic";
import { HandPiece } from "./HandPiece";
import { Flag } from "./Flag";
import type { WDClient } from "@wilpam/wp2p/WD";
import { InfoBar } from "./InfoBar";

interface Props {
  initialBoardState: BoardState;
  client: WDClient | null;
}

export function Board({ initialBoardState, client }: Props) {

  const [activePieceState, setActivePieceState] = useState<PieceState | null>(null)
  const [isPlacing, setIsPlacing] = useState<boolean>(false);
  const [boardState, setBoardState] = useState<BoardState>(initialBoardState);
  const [moveCount, setMoveCount] = useState<number>(0); //later use a method of updating that doesnt involve this
  const callbacks = useRef<Map<EventListener, string>>(new Map());

  const singleplayer = (client === null);
  let isWhite = (client?.id == 1 ? false : true);

  let board = [];
  let pieces = boardState.pieces

  let whiteHand = boardState.whiteHand
  let blackHand = boardState.blackHand

  let gameCondition = checkGameCondition(boardState)

  for (let i = 0; i < pieces.length; i++) {
    let piece = pieces[i]
    board.push(<Piece key={i} white={piece.white} commander={piece.commander} position={piece.position} onClick={pieceClicked} />)
  }

  for (const [ callback, event ] of callbacks.current.entries()) {
    client?.removeEventListener(event, callback)
  }
  client?.addEventListener("jsonmessage", message)
  callbacks.current.set(message, "jsonmessage")

  useEffect(() => {
    client?.sendJson("move", boardState);
  }, [moveCount])

  function message(event: Event) {
    let e = event as MessageEvent;
    if (e.data.type == "move") {
      let newBoard = BoardState.remake(e.data.data)
      if (newBoard.secondPhase != boardState.secondPhase) { //make this check better later?
        setBoardState(newBoard);
      }
    }
  }

  function backgroundClicked(e: React.MouseEvent) {
    setActivePieceState(null)
    setIsPlacing(false);
  }

  function pieceClicked(e: React.MouseEvent, position: Position) {
    //alert(`clicked piece at ${position.x},${position.y}`)
    if (gameCondition != GameCondition.Regular) { return; }
    let piece = pieces.find((piece) => piece.position == position)
    if (piece == null) { return; }
    if (piece == activePieceState) {
      setActivePieceState(null);
      setIsPlacing(false);
      return;
    }
    if ((isWhite != piece.white) && !singleplayer) { return; }
    if (piece.white == boardState.whiteTurn) {
      setActivePieceState(piece);
    }
  }

  function highlightClicked(e: React.MouseEvent, piece: PieceState, position: Position){
    if (isWhite != piece.white && !singleplayer) { return; }
    if (isPlacing) {
      if (boardState.whiteTurn) {
        boardState.whiteHand -= 1;
      } else {
        boardState.blackHand -= 1;
      }
      boardState.pieces.push(new PieceState(boardState.whiteTurn, false, position));
      setIsPlacing(false);
      setBoardState(doPhase(boardState));
      setMoveCount(moveCount+1);
    } else if (activePieceState != null) {
      setBoardState(movePiece(activePieceState, boardState, position));
      setMoveCount(moveCount+1);
    }
    setActivePieceState(null);
  }

  function handPieceClicked(e: React.MouseEvent, white: boolean){
    if (gameCondition != GameCondition.Regular) { return; }
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

  let info = "";
  if (boardState.whiteTurn != isWhite) {
    info = "Other player is finding a move..."
  }
  switch (gameCondition) {
    case GameCondition.WhiteWins:
      info = "White has won the game!";
      break;
    case GameCondition.BlueWins:
      info = "Blue has won the game!";
      break;
    case GameCondition.Stalemate:
      info = "The game has become a stalemate!";
      break;
  }

  return (
    <div id="aq-board-container">
      <div id="aq-board">
        <img id="aq-board-img" src="/aquamarines/board.png" draggable="false" onClick={backgroundClicked} />
        <Flag white={boardState.whiteTurn} secondPhase={boardState.secondPhase} gameCondition={gameCondition}></Flag>
        {board}
        {highlights}
        {hands}
      </div>
      <InfoBar>{info}</InfoBar>
    </div>
  );
}

