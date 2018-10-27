import React, { Component } from "react";

class Game extends Component {
  constructor(props) {
    super(props);
    const { boardSizeX, boardSizeY } = props;
    this.spritesPos = this.generateSpritesPos(boardSizeX, boardSizeY);
    this.moves = 0; // please check readme
    this.remainingSprites = boardSizeY;

    // initially user is placed in center
    this.state = {
      userPos: {
        x: Math.floor(boardSizeX / 2),
        y: Math.floor(boardSizeY / 2)
      },
      hasFinished: false
    };
  }

  generateSpritesPos(boardSizeX, boardSizeY) {
    const spritesPos = [];
    for (let i = 0; i < boardSizeY; i += 1) {
      const spritePos = Math.floor(Math.random() * boardSizeX);
      spritesPos.push(spritePos);
    }

    // index is the row number and spritesPos[key] is the column number
    return spritesPos;
  }

  updateMove({ x, y }) {
    if (this.spritesPos[y] === x) {
      this.spritesPos[y] = -1;
      this.remainingSprites -= 1;
    }

    const hasFinished = this.remainingSprites === 0;

    if (!this.state.hasFinished && hasFinished) {
      this.setState({
        hasFinished: true
      });
    }
  }

  moveUp = ({ userPos }) => {
    const userPosY = userPos.y;
    let newY;

    if (userPosY > 0) {
      newY = userPosY - 1;
      this.moves += 1;
    } else {
      newY = userPosY;
    }

    const newUserPos = {
      x: userPos.x,
      y: newY
    };

    return {
      userPos: newUserPos
    };
  };

  moveDown = ({ userPos }) => {
    const userPosY = userPos.y;
    let newY;
    const { boardSizeY } = this.props;

    if (userPosY < boardSizeY - 1) {
      newY = userPosY + 1;
      this.moves += 1;
    } else {
      newY = userPosY;
    }

    const newUserPos = {
      x: userPos.x,
      y: newY
    };

    return {
      userPos: newUserPos
    };
  };

  moveLeft = ({ userPos }) => {
    const userPosX = userPos.x;
    let newX;

    if (userPosX > 0) {
      newX = userPosX - 1;
      this.moves += 1;
    } else {
      newX = userPosX;
    }

    const newUserPos = {
      x: newX,
      y: userPos.y
    };

    return {
      userPos: newUserPos
    };
  };

  moveRight = ({ userPos }) => {
    const userPosX = userPos.x;
    let newX;
    const { boardSizeX } = this.props;

    if (userPosX < boardSizeX - 1) {
      newX = userPosX + 1;
      this.moves += 1;
    } else {
      newX = userPosX;
    }

    const newUserPos = {
      x: newX,
      y: userPos.y
    };

    return {
      userPos: newUserPos
    };
  };

  keyHandler = event => {
    const { key } = event;
    const arrowMapping = {
      ArrowLeft: this.moveLeft,
      ArrowRight: this.moveRight,
      ArrowUp: this.moveUp,
      ArrowDown: this.moveDown
    };
    const stateUpdater = arrowMapping[key];
    this.setState(stateUpdater, () => this.updateMove(this.state.userPos));
  };

  renderBoard(boardSizeX, boardSizeY) {
    const {
      userPos: { x: userPosX, y: userPosY }
    } = this.state;
    const markup = [];
    for (let i = 0; i < boardSizeY; i++) {
      const rowInnerMarkup = [];
      for (let j = 0; j < boardSizeX; j++) {
        const classList = ["board-cell"];
        if (this.spritesPos[i] === j) {
          classList.push("has-sprite");
        }

        if (userPosY === i && userPosX === j) {
          classList.push("has-user");
        }

        const className = classList.join(" ");
        rowInnerMarkup.push(<td key={`${i}-${j}`} className={className} />);
      }
      const rowMarkup = <tr key={i}>{rowInnerMarkup}</tr>;
      markup.push(rowMarkup);
    }
    return markup;
  }

  render() {
    const { boardSizeX, boardSizeY } = this.props;
    // this.updateMove(this.state.userPos);
    return (
      <section className="game">
        {this.state.hasFinished ? (
          <p>
            Took <strong>{this.moves} </strong>
            moves
          </p>
        ) : (
          <div>
            <table
              className="board"
              tabIndex="0"
              onKeyDown={this.keyHandler}
              data-testid="game-table"
            >
              <tbody>{this.renderBoard(boardSizeX, boardSizeY)}</tbody>
            </table>
            <p>
              Moves so far
              <strong> {this.moves}</strong>
            </p>
          </div>
        )}
      </section>
    );
  }
}

export { Game };
