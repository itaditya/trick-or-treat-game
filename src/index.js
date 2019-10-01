import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import { Game } from "./Game";
import ScoreBoard from "./ScoreBoard";

const App = function() {
  const boardSizeX = 10;
  const boardSizeY = 10;

  return (
    <div className="App">
      <ScoreBoard />
      <Game boardSizeX={boardSizeX} boardSizeY={boardSizeY} />
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
