import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import { Game } from "./Game";
import BackgroundAudio from './BackgroundAudio'

const App = function() {
  const boardSizeX = 10;
  const boardSizeY = 10;

  return (
    <div className="App">
      <BackgroundAudio />
      <Game boardSizeX={boardSizeX} boardSizeY={boardSizeY} />
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
