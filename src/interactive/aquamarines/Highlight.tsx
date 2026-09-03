import { Position } from "./types/Position";
import "./Highlight.css"
import type { PieceState } from "./logic/PieceState";
import { piece_base_position, piece_x_vector, piece_y_vector } from "./logic/Constants";

interface Props {
  piece: PieceState
  position: Position;
  onClick: Function;
}


export function Highlight({piece, position, onClick}: Props) {

  const base_position = piece_base_position;;
  const x_vector = piece_x_vector;
  const y_vector = piece_y_vector;
  
  let piece_x = base_position[0] + x_vector[0] * position.x + y_vector[0] * position.y;
  let piece_y = base_position[1] + x_vector[1] * position.x + y_vector[1] * position.y;

  return (
      <div className="highlight" style={{
        top: `calc(50% + ${piece_y}px)`,
        left: `calc(50% + ${piece_x}px)`,
      }}
        onClick={(e) => onClick(e, piece, position)}
      >

        
      </div>
  );
}
