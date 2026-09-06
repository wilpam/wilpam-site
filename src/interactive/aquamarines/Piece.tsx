import { Position } from "./types/Position";
import "./Piece.css"
import { useRef, useState, type RefObject } from "react";
import { piece_base_position, piece_x_vector, piece_y_vector } from "./logic/Constants";

interface Props {
  white: boolean;
  commander: boolean;
  position: Position;
  onClick: Function;
}


export function Piece({white, commander, position, onClick}: Props) {
  
  const base_position = piece_base_position;
  const x_vector = piece_x_vector;
  const y_vector = piece_y_vector;
  
  let piece_x = base_position[0] + x_vector[0] * position.x + y_vector[0] * position.y;
  let piece_y = base_position[1] + x_vector[1] * position.x + y_vector[1] * position.y;

  let piece_image = commander ? (white ? "commander" : "commander_blue") : (white ? "piece" : "piece_blue");

  return (
      <div className="aq-piece" style={{
        top: `calc(50% + ${piece_y}px)`,
        left: `calc(50% + ${piece_x}px)`,
        backgroundImage: `url("/aquamarines/${piece_image}.png")`
      }}
        onClick={(e) => onClick(e, position)}
      >


        
      </div>
  );
}
