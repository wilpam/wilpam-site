import { type RefObject } from "react";
import { WDClient } from "wp2p/WD";
import "./Waiting.css";

interface Props {
  client: RefObject<WDClient | null>;
}

export function Waiting({ client }: Props ) {

  return (
      <div id="aq-waiting">
        <div id="aq-waiting-vert">
          <p className="aq-unselectable">Give another player this code so they can join:</p>
          <p id="aq-waiting-code">{client.current?.roomID}</p>
        </div>
      </div>
  );
}
