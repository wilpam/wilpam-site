import { useRef, useState, type RefObject } from "react";
import "./Lobby.css";
import { WDClient } from "@wilpam/wp2p/WD";
import { aqGame, aqURL } from "./wp2p/Constants";
import type { JoinResponseEvent, WPCloseEvent } from "@wilpam/wp2p";

interface Props {
  client: RefObject<WDClient | null>;
  callback: Function;
  error: string;
}

export function Lobby({ client, callback, error }: Props ) {
  const idRef = useRef<HTMLInputElement>(null);
  const [err, setErr] = useState<string>(error);

  function logError(e: string) {
    console.log(e)
    setErr(e)
  }

  function provideReqs() {
    return {"username": "John Hosting"}
  }

  async function connect() {

    client.current = new WDClient(aqGame)
    let c = client.current;

    c.connect(aqURL)
    var connectionResult: Event | CustomEvent | WPCloseEvent = await c.waitForOneOf(["connected", "error", "close"])
    if (connectionResult.type == "error") {
      logError('Could not connect');
    } else if (connectionResult.type == "close") {
      logError(`Server rejected connection [${(connectionResult as WPCloseEvent).reason}]`);
    }

  }

  async function createGame() {
    await connect();

    let c = client.current as WDClient;

    c.createAnonymousRoom(undefined, provideReqs())
    
    var joinResponse: JoinResponseEvent = await c.waitFor("joinresponse");
    if (joinResponse.joined) {
      callback(true)
      return
    } else {
      logError(`Could not join room [${joinResponse.reason}]`)
    }
    client.current = null;
  }

  async function joinGame() {
    await connect();
  
    let c = client.current as WDClient;

    let id = idRef.current?.value;
    if (id === undefined) {
      return // ??
    }
    
    c.joinRoom(id, provideReqs())

    var joinResponse: JoinResponseEvent = await c.waitFor("joinresponse")
    if (joinResponse.joined) {
      callback(false)
      return
    } else {
      logError(`Could not join room [${joinResponse.reason}]`)
    }
    client.current = null;
  }

  return (
      <div id="aq-lobby">
        <div id="aq-lobby-vert">
          <h1 id="aq-title">Aquamarines</h1>
          <div className="aq-lobby-button" onClick={createGame}>Create a game</div>
          <div className="aq-lobby-button" onClick={joinGame}>Join a game</div>
          <input className="aq-id-input" placeholder="Game ID" ref={idRef}>
          </input>
          {err ? <p style={{color: "#ef2020"}}>{err}</p> : null}
        </div>
      </div>
  );
}
