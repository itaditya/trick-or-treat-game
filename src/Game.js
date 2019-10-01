import React, { Component, createRef } from "react";

class Game extends Component {
  constructor(props) {
    super(props);
    const { boardSizeX, boardSizeY } = props;
    this.spritesPos = this.generateSpritesPos(boardSizeX, boardSizeY);
    this.moves = 0; // please check readme
    this.remainingSprites = boardSizeY;
    this.boardRef = createRef();
    // initially user is placed in center
    this.state = {
      userPos: {
        x: Math.floor(boardSizeX / 2),
        y: Math.floor(boardSizeY / 2)
      },
      hasFinished: true,
      username: null,
      isMovesSaved: false
    };
  }

  componentDidMount() {
    this.focusBoard();
  }

  focusBoard() {
    const boardRef = this.boardRef.current;
    if (boardRef) {
      boardRef.focus();
    }
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

  /* 
    Takes username input to save moves
     ** Contributed by Soham Mondal <contact@sohammondal.com> **
  */
  userNameInputForm() {
    return (
      <span className="userNameInputForm">
        <input
          type="text"
          placeholder="Your name..."
          onChange={e => this.setState({ username: e.target.value })}
        />
        <button
          type="submit"
          onClick={() => this.saveMoves(this.state.username, this.moves)}
        >
          Save
        </button>
      </span>
    );
  }

  /* 
    Save moves to localStorage 
     ** Contributed by Soham Mondal <contact@sohammondal.com> **
  */
  saveMoves(name, moves) {
    // console.log(moves);
    const user = {
      name,
      moves
    };
    let savedUserMoves = localStorage.getItem("userMoves");
    if (savedUserMoves) {
      savedUserMoves = JSON.parse(savedUserMoves);
      // console.log(savedUserMoves);
      savedUserMoves.push(user);
      localStorage.setItem("userMoves", JSON.stringify(savedUserMoves));
      this.setState({ isMovesSaved: true });
    } else {
      localStorage.setItem("userMoves", JSON.stringify([user]));
    }
  }

  updateMove({ x, y }) {
    if (this.spritesPos[y] === x) {
      this.spritesPos[y] = -1;
      this.remainingSprites -= 1;
    }

    const hasFinished = this.remainingSprites === 0;

    if (!this.state.hasFinished && hasFinished) {
      // this.saveMoves(this.moves);
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

  handleGameClick = () => {
    this.focusBoard();
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
        if (userPosY === i && userPosX === j) {
          classList.push("has-user");
        } else if (this.spritesPos[i] === j) {
          classList.push("has-sprite");
          const spriteType = (j % 3) + 1;
          classList.push(`sprite-${spriteType}`);
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
    return (
      <section className="game" onClick={this.handleGameClick}>
        {this.state.hasFinished ? (
          <p className="moves">
            Took &nbsp;
            <strong data-testid="moveCounter">{this.moves}</strong>
            &nbsp; moves
            <br />
            <br />
            {this.state.isMovesSaved ? (
              <span>Thanks, {this.state.username}! Your moves are saved.</span>
            ) : (
              this.userNameInputForm()
            )}
            <br />
            <br />
            Refresh page to play again
          </p>
        ) : (
          <div>
            <table
              className="board"
              tabIndex="0"
              ref={this.boardRef}
              onKeyDown={this.keyHandler}
              data-testid="game-table"
            >
              <tbody>{this.renderBoard(boardSizeX, boardSizeY)}</tbody>
            </table>
            <p className="moves">
              Moves so far &nbsp;
              <strong data-testid="moveCounter">{this.moves}</strong>
            </p>
          </div>
        )}
      </section>
    );
  }
}

export { Game };
