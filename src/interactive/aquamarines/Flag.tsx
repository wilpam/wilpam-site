import "./Flag.css";
import { flag_base_position } from "./logic/Constants";
import { preload } from 'react-dom'
import { GameCondition } from "./logic/Logic";

interface Props {
  white: boolean;
  secondPhase: boolean;
  gameCondition: GameCondition;
}


export function Flag({white, secondPhase, gameCondition}: Props) {
  
  //perhaps this can be clicked during the second phase to revert to the first phase?

  preload("/aquamarines/flag.png", {as: "image"})
  preload("/aquamarines/flag2.png", {as: "image"})
  preload("/aquamarines/flag_blue.png", {as: "image"})
  preload("/aquamarines/flag2_blue.png", {as: "image"})

  let image: string;
  switch (gameCondition) {
    case GameCondition.Regular:
      image = secondPhase ? (white ? "flag2" : "flag2_blue") : (white ? "flag" : "flag_blue");
      break;
    case GameCondition.WhiteWins:
      image = "flag_win"
      break;
    case GameCondition.BlueWins:
      image = "flag_win_blue"
      break;
    case GameCondition.Stalemate:
      image = "flag_stalemate"
      break;
    default:
      image = "flag"
  }

  return (
      <div className="aq-flag" style={{
        top: `calc(50% + ${flag_base_position[1]}px)`,
        left: `calc(50% + ${flag_base_position[0]}px)`,
        backgroundImage: `url("/aquamarines/${image}.png")`
      }}></div>
  );
}
