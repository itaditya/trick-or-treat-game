import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';

import './styles.css';
import { Game } from './Game';
import { BOARD_SIZE_MAX, BOARD_SIZE_MIN } from './constants';
import { GitHubRibbon } from './GitHubRibbon';

const BackgroundAudio = lazy(() => import('./BackgroundAudio'));


function getBoardSize() {
  const strQuery = window.location.search;
  const paramsQuery = new URLSearchParams(strQuery);
  const paramSize = paramsQuery.get('size');
  return parseInt(paramSize, 10) || BOARD_SIZE_MAX;
}

const App = function () {
  let size = getBoardSize();
  size = Math.max(BOARD_SIZE_MIN, size);
  size = Math.min(BOARD_SIZE_MAX, size);

  const boardSizeX = size;
  const boardSizeY = size;

  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <GitHubRibbon />
        <BackgroundAudio />
      </Suspense>
      <Game boardSizeX={boardSizeX} boardSizeY={boardSizeY} />
    </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
