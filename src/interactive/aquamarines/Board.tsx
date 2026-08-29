import { PieceState } from "./logic/PieceState";
import { Piece } from "./Piece";
import "./Board.css";

interface Props {
  pieces: PieceState[];
}

export function Board({ pieces }: Props) {

  let board = [];

  for (let i = 0; i < pieces.length; i++) {
    let piece = pieces[i]
    board.push(<Piece key={i} white={piece.white} commander={piece.commander} position={piece.position}></Piece>)
  }

  return (
    <div id="board">
      <img id="board-img" src="/aquamarines/board.png" draggable="false" />
      {board}
    </div>
  );
}

