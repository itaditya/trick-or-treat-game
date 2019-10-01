import React from 'react';

import './scoreboard.css';

/* 
    Read saved user moves from localStorage
    Render ScoreBoard
    
    ** Contributed by Soham Mondal <contact@sohammondal.com> **
  */

class ScoreBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userMoves: null,
    };
  }

  componentDidMount() {
    this.getUserMovesFromLocalStorage();
  }
  getUserMovesFromLocalStorage() {
    let savedUserMoves = localStorage.getItem('userMoves');
    if (savedUserMoves) {
      savedUserMoves = JSON.parse(savedUserMoves);
      savedUserMoves.sort((user1, user2) => user1.moves - user2.moves);
      this.setState({ userMoves: savedUserMoves });
    }
  }

  renderScoreboard(userMovesArray) {
    return (
      <div>
        <div className="scoreboard-title">Score Board</div>
        <ol className="scoreboard-list">
            {userMovesArray.map(({ name, moves }, index) => {
              return (
                <li
                  key={index}
                  className="scoreboard-item"
                >
                  <strong>{name}</strong>
                  <span>: {moves} moves</span>
                </li>
              );
            })}
        </ol>
      </div>
    );
  }
  render() {
    return this.state.userMoves ? this.renderScoreboard(this.state.userMoves) : null;
  }
}

export { ScoreBoard };
