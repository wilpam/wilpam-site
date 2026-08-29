import { Position } from "./types/Position";
import "./Piece.css"

interface Props {
  white: boolean;
  commander: boolean;
  position: Position;
}


export function Piece({white, commander, position}: Props) {
  const base_position = [0,388]
  const x_vector = [35,-35]
  const y_vector = [-35,-35]
  
  let piece_x = base_position[0] + x_vector[0] * position.x + y_vector[0] * position.y
  let piece_y = base_position[1] + x_vector[1] * position.x + y_vector[1] * position.y

  function pieceClicked(e: React.MouseEvent) {
    alert("Unfortunately we haven't invented playing the game yet.");
  }

  return (
      <div className="piece" style={{
        top: `${piece_y}px`,
        left: `calc(50% + ${piece_x}px)`
      }}
        onMouseDown={(e) => pieceClicked(e)}
      >
        
      </div>
  );
}
