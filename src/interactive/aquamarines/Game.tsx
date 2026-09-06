import { useEffect, useRef, useState, } from "react";
import { Board } from "./Board";
import { BoardState } from "./logic/BoardState"
import { initialPieces } from "./logic/Constants";
import { Lobby } from "./Lobby";
import { WDClient } from "@wilpam/wp2p/WD";
import { Waiting } from "./Waiting";

export function Game() {
  const [board, setBoard] = useState<BoardState>(initialPieces.clone())
  const client = useRef<WDClient | null>(null);
  const [connectionAlive, setConnectionAlive] = useState<boolean>(false);
  const [state, setState] = useState<GameState>(GameState.Lobby)
  const error = useRef<string>("");

  useEffect(() => {
    return endSocket;
  }, [])

  useEffect(() => {
    window.addEventListener('beforeunload', endSocket);
    return () => {
      window.removeEventListener('beforeunload', endSocket);
    };
  }, [])

  function endSocket() {
    client.current?.disconnect(1001)
  }

  function disconnect(err: string) {
    setConnectionAlive(false)
    error.current = err;
  }

  function lobbyCallback(created: boolean) {

    let c = client.current as WDClient;
    setConnectionAlive(true)
    c.addEventListener("close", (e) => disconnect("Disconnected from game"))
    c.addEventListener("error", (e) => disconnect("Disconnected from game"))
    c.addEventListener("clientleft", (e) => disconnect("Other player left game"))
    c.addEventListener("jsonmessage", (e) => console.log((e as MessageEvent).data))

    if (created) {
      gameCreated();
    } else {
      startGame();
    }
  }

  function gameCreated() {
    setState(GameState.Waiting);
    let c = client.current as WDClient;
    c.addEventListener("playerjoined", (e) => startGame())
  }

  function startGame() {
    setState(GameState.InGame);
    setBoard(initialPieces.clone())
  }

  if (connectionAlive == false && state != GameState.Lobby) {
    setState(GameState.Lobby);
  }

  switch (state) {
    case GameState.Lobby:
      return (
        <Lobby client={client} callback={lobbyCallback} error={error.current}></Lobby>
      );

    case GameState.Waiting:
      return (
        <Waiting client={client}></Waiting>
      )

    case GameState.InGame:
      return (
        <Board initialBoardState={board} client={client.current}></Board>
      );

  }
}

enum GameState {
  Lobby,
  Waiting,
  InGame
}