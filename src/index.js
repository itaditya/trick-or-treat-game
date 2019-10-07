import React, {lazy, Suspense} from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import { Game } from "./Game";
const BackgroundAudio = lazy(() => import('./BackgroundAudio'))

const App = function() {
  const boardSizeX = 10;
  const boardSizeY = 10;

  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <BackgroundAudio />
      </Suspense>
      <Game boardSizeX={boardSizeX} boardSizeY={boardSizeY} />
    </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
