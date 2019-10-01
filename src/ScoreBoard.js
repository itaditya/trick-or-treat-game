import React from "react";
import "./scoreboard.css";

/* 
    Read moves from localStorage
    Render Scoreboard
    Contributed by Soham Mondal <contact@sohammondal.com>
  */

class Scoreboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moves: null
    };
  }

  componentDidMount() {
    this.getMovesFromLocalStorage();
  }
  getMovesFromLocalStorage() {
    let savedMoves = localStorage.getItem("moves");
    if (savedMoves) {
      savedMoves = savedMoves.split(",").sort();
      this.setState({ moves: savedMoves });
    }
  }

  renderScoreboard(moves) {
    return (
      <div className="scoreboard">
        <div className="scoreboard-title">Past Scores</div>
        <ul className="scoreboard-scores-list">
          {moves.map((move, index) => {
            let color = "#FFFFF";
            if (index === 0) {
              //green - top score - least moves
              color = "#01D28E";
            }
            if (index > 0 && index === moves.length - 1) {
              //red - worst score - most moves
              color = "#FA1D2F";
            }
            return (
              <li
                key={index}
                className="scoreboard-score-list-item"
                style={{
                  color
                }}
              >
                {move}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
  render() {
    return this.state.moves ? this.renderScoreboard(this.state.moves) : null;
  }
}

export default Scoreboard;
