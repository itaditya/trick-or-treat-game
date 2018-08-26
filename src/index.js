import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import { Game } from "./Game";

const App = function() {
  const boardSizeX = parseInt(prompt("Enter boardSizeX"));
  const boardSizeY = parseInt(prompt("Enter boardSizeY"));
  if (Number.isNaN(boardSizeX) || Number.isNaN(boardSizeY)) {
    alert("Please provide proper values");
    return;
  }

  return (
    <div className="App">
      <Game boardSizeX={boardSizeX} boardSizeY={boardSizeY} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
