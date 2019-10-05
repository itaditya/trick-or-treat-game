import React from 'react';

import './scoreboard.css';

class ScoreBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userMoves: null,
      boardSize: props.boardSize
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

    if (!Array.isArray(savedUserMoves)) {
      return;
    }

    const sortedUserMoves = savedUserMoves.sort((user1, user2) => user1.moves - user2.moves);
    this.setState({ userMoves: sortedUserMoves });
  }

  renderScoreboard() {
    const { userMoves } = this.state;
    return (
      <section className="scoreboard">
        <div className="scoreboard-title">Score Board</div>
        <ol className="scoreboard-list">
          {userMoves.map(({ name, moves }, index) => {
            const finalMoves = moves * (11 - this.state.boardSize);
            return (
              <li
                key={index}
                className="scoreboard-item"
              >
                <strong>{name}</strong>
                <span>: {finalMoves} moves</span>
              </li>
            );
          })}
        </ol>
      </section>
    );
  }
  render() {
    return this.state.userMoves ? this.renderScoreboard() : null;
  }
}

export { ScoreBoard };
