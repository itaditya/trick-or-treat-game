import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import { Game } from "./Game";

import getUrlParams from './getUrlParams';

const App = function () {

  let size = parseInt(getUrlParams('size'), 10);

  if (isNaN(size)) size = 10;
  else if (size < 4) size = 4;
  else if (size > 10) size = 10;

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
