import { useEffect, useRef, useState, } from "react";
import { Board } from "./Board";
import { BoardState } from "./logic/BoardState"
import { initialPieces } from "./logic/Constants";

export function Game() {
  const [board, setBoard] = useState<BoardState>(initialPieces.clone())

  return (
    <Board boardState={board}></Board>
  );
}
