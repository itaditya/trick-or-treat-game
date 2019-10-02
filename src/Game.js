import React, { useState, useEffect, useCallback, useRef } from "react";

const upArrow = (
  <svg viewBox="0 0 24 24" width="36" height="36">
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M12 8l6 6H6z" fill="rgba(255,255,255,1)" />
  </svg>
);

const rightArrow = (
  <svg viewBox="0 0 24 24" width="36" height="36">
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M16 12l-6 6V6z" fill="rgba(255,255,255,1)" />
  </svg>
);

const leftArrow = (
  <svg viewBox="0 0 24 24" width="36" height="36">
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M8 12l6-6v12z" fill="rgba(255,255,255,1)" />
  </svg>
);

const downArrow = (
  <svg viewBox="0 0 24 24" width="36" height="36">
    <path fill="none" d="M0 0h24v24H0z" />
    <path d="M12 16l-6-6h12z" fill="rgba(255,255,255,1)" />
  </svg>
);

function Game({ boardSizeX, boardSizeY }) {
  const [spritesPos] = useState(() =>
    generateSpritesPos(boardSizeX, boardSizeY)
  );
  const [moves, setMoves] = useState(0); // please check readme
  // initially user is placed in center
  const [userPos, setUserPos] = useState({
    x: Math.floor(boardSizeX / 2),
    y: Math.floor(boardSizeY / 2)
  });
  const [hasFinished, setHasFinished] = useState(false);
  const boardRef = useRef();
  let remainingSprites = boardSizeY;

  useEffect(() => {
    focusBoard();
  }, []);

  const focusBoard = () => {
    const boardRefElement = boardRef.current;
    if (boardRefElement) {
      boardRefElement.focus();
    }
  };

  function generateSpritesPos(boardSizeX, boardSizeY) {
    const spritesPos = [];
    for (let i = 0; i < boardSizeY; i += 1) {
      const spritePos = Math.floor(Math.random() * boardSizeX);
      spritesPos.push(spritePos);
    }

    // index is the row number and spritesPos[key] is the column number
    return spritesPos;
  }

  const updateMove = useCallback(
    ({ x, y }) => {
      if (spritesPos[y] === x) {
        spritesPos[y] = -1;
        remainingSprites -= 1;
      }

      const hasFinishedAfterMove = remainingSprites === 0;

      if (!hasFinished && hasFinishedAfterMove) {
        setHasFinished(true);
      }
    },
    [spritesPos]
  );

  const moveUp = userPos => {
    const userPosY = userPos.y;
    let newY;

    if (userPosY > 0) {
      newY = userPosY - 1;
      setMoves(moves => moves + 1);
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

  const moveDown = userPos => {
    const userPosY = userPos.y;
    let newY;

    if (userPosY < boardSizeY - 1) {
      newY = userPosY + 1;
      setMoves(moves => moves + 1);
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

  const moveLeft = userPos => {
    const userPosX = userPos.x;
    let newX;

    if (userPosX > 0) {
      newX = userPosX - 1;
      setMoves(moves => moves + 1);
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

  const moveRight = userPos => {
    const userPosX = userPos.x;
    let newX;

    if (userPosX < boardSizeX - 1) {
      newX = userPosX + 1;
      setMoves(moves => moves + 1);
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

  const handleGameClick = () => {
    focusBoard();
  };

  const keyAndClickHandler = event => {
    const { key } = event;
    const arrowMapping = {
      ArrowLeft: moveLeft,
      ArrowRight: moveRight,
      ArrowUp: moveUp,
      ArrowDown: moveDown
    };
    const stateUpdater = arrowMapping[key];

    if (stateUpdater) {
      const { userPos: updatedUserPos } = stateUpdater(userPos);
      setUserPos(updatedUserPos);
      updateMove(updatedUserPos);
    }
  };

  const renderBoard = useCallback(
    (boardSizeX, boardSizeY) => {
      const { x: userPosX, y: userPosY } = userPos;
      const markup = [];
      for (let i = 0; i < boardSizeY; i++) {
        const rowInnerMarkup = [];
        for (let j = 0; j < boardSizeX; j++) {
          const classList = ["board-cell"];
          if (userPosY === i && userPosX === j) {
            classList.push("has-user");
          } else if (spritesPos[i] === j) {
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
    },
    [userPos, spritesPos]
  );

  return (
    <section className="game" onClick={handleGameClick}>
      {hasFinished ? (
        <p className="moves">
          Took &nbsp;
          <strong data-testid="moveCounter">{moves}</strong>
          &nbsp; moves
          <br />
          <br />
          Refresh page to play again
        </p>
      ) : (
        <div>
          <table
            className="board"
            tabIndex="0"
            ref={boardRef}
            onKeyDown={keyAndClickHandler}
            data-testid="game-table"
          >
            <tbody>{renderBoard(boardSizeX, boardSizeY)}</tbody>
          </table>
          <p className="moves">
            Moves so far &nbsp;
            <strong data-testid="moveCounter">{moves}</strong>
          </p>
          <div className="gamepad">
            <button
              className="gamepad__control gamepad__control--up"
              onClick={() => {
                const event = { key: "ArrowUp" };
                keyAndClickHandler(event);
              }}
            >
              {upArrow}
            </button>
            <button
              className="gamepad__control gamepad__control--right"
              onClick={() => {
                const event = { key: "ArrowRight" };
                keyAndClickHandler(event);
              }}
            >
              {rightArrow}
            </button>
            <button
              className="gamepad__control gamepad__control--left"
              onClick={() => {
                const event = { key: "ArrowLeft" };
                keyAndClickHandler(event);
              }}
            >
              {leftArrow}
            </button>
            <button
              className="gamepad__control gamepad__control--down"
              onClick={() => {
                const event = { key: "ArrowDown" };
                keyAndClickHandler(event);
              }}
            >
              {downArrow}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export { Game };
