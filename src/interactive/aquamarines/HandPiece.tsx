import { Position } from "./types/Position";
import "./HandPiece.css"
import { useRef, useState, type RefObject } from "react";
import { black_hand_base_position, piece_base_position, piece_x_vector, piece_y_vector, white_hand_base_position } from "./logic/Constants";

interface Props {
  index: number;
  white: boolean;
  commander: boolean;
  onClick: Function;
}


export function HandPiece({index, white, commander, onClick}: Props) {
  
  const base_position = white ? white_hand_base_position : black_hand_base_position;
  const x_vector = piece_x_vector;
  const y_vector = piece_y_vector;
  
  let piece_x = base_position[0] - piece_y_vector[0] * (white ? 1 : -1) * index;
  let piece_y = base_position[1] - piece_y_vector[1] * (white ? 1 : -1) * index;

  let piece_image = commander ? (white ? "commander" : "commander_blue") : (white ? "piece" : "piece_blue");

  return (
      <div className="hand-piece" style={{
        top: `calc(50% + ${piece_y}px)`,
        left: `calc(50% + ${piece_x}px)`,
        backgroundImage: `url("/aquamarines/${piece_image}.png")`
      }}
        onClick={(e) => onClick(e, white)}
      >


        
      </div>
  );
}
