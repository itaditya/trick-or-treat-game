import React from "react";
import "./scoreboard.css";

/* 
    Read saved user moves from localStorage
    Render Scoreboard
    
    ** Contributed by Soham Mondal <contact@sohammondal.com> **
  */

class Scoreboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userMoves: null
    };
  }

  componentDidMount() {
    this.getUserMovesFromLocalStorage();
  }
  getUserMovesFromLocalStorage() {
    let savedUserMoves = localStorage.getItem("userMoves");
    if (savedUserMoves) {
      savedUserMoves = JSON.parse(savedUserMoves);
      savedUserMoves.sort((user1, user2) => user1.moves - user2.moves);
      this.setState({ userMoves: savedUserMoves });
    }
  }

  renderScoreboard(userMovesArray) {
    return (
      <div className="scoreboard">
        <div className="scoreboard-title">Scoreboard</div>
        <table>
          <tbody>
            {userMovesArray.map(({ name, moves }, index) => {
              let color = "#FFFFF";
              if (index === 0) {
                //green - top score - least moves
                color = "#01D28E";
              }
              if (index > 0 && index === userMovesArray.length - 1) {
                //red - worst score - most moves
                color = "#FA1D2F";
              }
              return (
                <tr
                  key={index}
                  style={{
                    color
                  }}
                >
                  <td>{index + 1}.</td>
                  <td>{name}</td>
                  <td>{moves}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
  render() {
    return this.state.userMoves
      ? this.renderScoreboard(this.state.userMoves)
      : null;
  }
}

export default Scoreboard;
