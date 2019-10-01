import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import { Game } from "./Game";

class App extends Component {
  state = {
    restart: 'mount',
  };

  handleRestart = () => {
    this.setState({ restart: 'unmount' });
    setTimeout(() => {
      this.setState({ restart: 'mount' });
    });
  }

  render() {
    const boardSizeX = 10;
    const boardSizeY = 10;

    return (
      <div className="App">
        {
          this.state.restart === 'mount' && (
            <Game boardSizeX={boardSizeX} boardSizeY={boardSizeY} onRestart={this.handleRestart} />
          )
        }
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
