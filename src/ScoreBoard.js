import React from 'react';

import './scoreboard.css';

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
    const jsonSavedUserMoves = localStorage.getItem('userMoves');

    if (!jsonSavedUserMoves) {
      return;
    }

    const savedUserMoves = JSON.parse(jsonSavedUserMoves);

    if(!Array.isArray(savedUserMoves)) {
      return;
    }

    const sortedUserMoves = savedUserMoves.sort((user1, user2) => user1.moves - user2.moves);
    this.setState({ userMoves: sortedUserMoves });
  }

  renderScoreboard() {
    const { userMoves } = this.state;
    return (
      <div>
        <div className="scoreboard-title">Score Board</div>
        <ol className="scoreboard-list">
            {userMoves.map(({ name, moves }, index) => {
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
    return this.state.userMoves ? this.renderScoreboard() : null;
  }
}

export { ScoreBoard };
