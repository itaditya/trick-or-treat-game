import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import { Game } from "./Game";
import { BOARD_SIZE_MAX, BOARD_SIZE_MIN } from './constants';

const App = function () {
  // eslint-disable-next-line
  let size = parseInt(new URLSearchParams(location.search).get('size'), 10);
  if (isNaN(size)) size = BOARD_SIZE_MAX;
  size = Math.max(BOARD_SIZE_MIN, size);
  size = Math.min(BOARD_SIZE_MAX, size);

  const boardSizeX = size;
  const boardSizeY = size;

  return (
    <div className="App">
      <Game boardSizeX={boardSizeX} boardSizeY={boardSizeY} />
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
