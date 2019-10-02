import React, {lazy, Suspense} from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import { Game } from "./Game";
const BackgroundAudio = lazy(() => import('./BackgroundAudio'))

const App = function() {
  const boardSizeX = 10;
  const boardSizeY = 10;

  const [muted, setMuted] = React.useState(true)
  const interactPage = () => {
      setMuted(false)
  }

  return (
    <div className="App" onClick={interactPage}>
      <Suspense fallback={<div>Loading...</div>}>
        <BackgroundAudio muted={muted} />
      </Suspense>
      <Game boardSizeX={boardSizeX} boardSizeY={boardSizeY} />
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
