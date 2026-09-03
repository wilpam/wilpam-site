import "./Flag.css";
import { flag_base_position } from "./logic/Constants";
import { preload } from 'react-dom'

interface Props {
  white: boolean;
  secondPhase: boolean;
}


export function Flag({white, secondPhase}: Props) {
  
  //perhaps this can be clicked during the second phase to revert to the first phase?

  preload("/aquamarines/flag.png", {as: "image"})
  preload("/aquamarines/flag2.png", {as: "image"})
  preload("/aquamarines/flag_blue.png", {as: "image"})
  preload("/aquamarines/flag2_blue.png", {as: "image"})

  let image = secondPhase ? (white ? "flag2" : "flag2_blue") : (white ? "flag" : "flag_blue");

  return (
      <div className="flag" style={{
        top: `calc(50% + ${flag_base_position[1]}px)`,
        left: `calc(50% + ${flag_base_position[0]}px)`,
        backgroundImage: `url("/aquamarines/${image}.png")`
      }}></div>
  );
}
