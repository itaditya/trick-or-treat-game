import React from "react";
import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'
import { render, fireEvent } from "react-testing-library";
import { Game } from "../Game";

const boardSizeX = 10;
const boardSizeY = 10;

describe('Game board', () => {
  it('should render correctly', () => {
    const { getByTestId } = render(
      <Game boardSizeX={boardSizeX} boardSizeY={boardSizeY} />
    );
    const gameTable = getByTestId("game-table");
    expect(gameTable).toBeVisible();
  });

  it('should have only one user tile', () => {
    const { queryAllByLabelText } = render(
      <Game boardSizeX={boardSizeX} boardSizeY={boardSizeY} />
    );

    const userTiles = queryAllByLabelText('user');
    expect(userTiles).toHaveLength(1);
  });

  it('should have 10 sprite tiles at the begining of the game', () => {
    const { queryAllByLabelText } = render(
      <Game boardSizeX={boardSizeX} boardSizeY={boardSizeY} />
    );

    const spriteTiles = queryAllByLabelText('sprite');
    expect(spriteTiles).toHaveLength(10);
  });

  it('should generate sprite position at the board render', () => {
    const spy = jest.spyOn(Game.prototype, 'generateSpritesPos');
    const { getByLabelText, container } = render(
      <Game boardSizeX={boardSizeX} boardSizeY={boardSizeY} />
    );
    expect(spy).toBeCalledWith(boardSizeX, boardSizeY);
  });

  it('should fire update user position on board render', () => {
    const spy = jest.spyOn(Game.prototype, 'updateMove');
    const initialUserPosition = { x: Math.floor(boardSizeX / 2), y: Math.floor(boardSizeY / 2) }

    const { getByLabelText, container } = render(
      <Game boardSizeX={boardSizeX} boardSizeY={boardSizeY} />
    );
    expect(spy).toBeCalledWith(initialUserPosition);
  });
});

describe('User movement', () => {
  it('should fire updateMove function on keystroke', () => {
    const spy = jest.spyOn(Game.prototype, 'moveRight');

    const { getByLabelText, container } = render(
      <Game boardSizeX={boardSizeX} boardSizeY={boardSizeY} />
    );
    fireEvent.keyDown(getByLabelText('mainBoard'), {
      key: 'ArrowRight',
      keyCode: 39,
      which: 39,
    });
    expect(spy).toHaveBeenCalled();
  });

});