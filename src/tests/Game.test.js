import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';

import { Game } from '../Game';

const boardSizeX = 10;
const boardSizeY = 10;

const originalLocalStorage = global.localStorage;

const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};

beforeAll(() => {
  global.localStorage = mockLocalStorage;
});

afterEach(cleanup);

afterAll(() => {
  global.localStorage = originalLocalStorage;
});

describe('Game board', () => {
  it('should have only one user tile', () => {
    const { container } = render(
      <Game boardSizeX={boardSizeX} boardSizeY={boardSizeY} />
    );

    const userTile = container.querySelectorAll('.has-user');
    expect(userTile).toHaveLength(1);
  });

  it('should have 10 sprite tiles at the begining of the game', () => {
    const { container } = render(
      <Game boardSizeX={boardSizeX} boardSizeY={boardSizeY} />
    );

    const spriteTiles = container.querySelectorAll('.has-sprite');
    expect(spriteTiles).toHaveLength(boardSizeY);
  });
});

describe('User movement', () => {
  const initialPosition = {
    x: Math.floor(boardSizeX / 2) + 1,
    y: Math.floor(boardSizeY / 2) + 1
  };
  // It has to +1, as applying for has-user class happens in a loop, that is iterating from 0.

  let board;

  beforeEach(() => {
    const { getByTestId, container } = render(
      <Game boardSizeX={boardSizeX} boardSizeY={boardSizeY} />
    );
    board = getByTestId('game-table');
  });

  it('should see user', () => {
    const userPosition = board.querySelector(
      `tr:nth-child(${initialPosition.y})>td:nth-child(${initialPosition.x})`
    );
    expect(userPosition.classList.contains('has-user')).toBe(true);
  });

  it('should move user left when left arrow key is pressed', () => {
    fireEvent.keyDown(board, {
      key: 'ArrowLeft'
    });
    const newUserPosition = board.querySelector(
      `tr:nth-child(${initialPosition.y})>td:nth-child(${initialPosition.x -
        1})`
    );

    expect(newUserPosition.classList.contains('has-user')).toBe(true);
  });

  it('should move user right when right arrow key is pressed', () => {
    fireEvent.keyDown(board, {
      key: 'ArrowRight'
    });
    const newUserPosition = board.querySelector(
      `tr:nth-child(${initialPosition.y})>td:nth-child(${initialPosition.x +
        1})`
    );
    expect(newUserPosition.classList.contains('has-user')).toBe(true);
  });

  it('should move user down when down arrow key is pressed', () => {
    fireEvent.keyDown(board, {
      key: 'ArrowDown'
    });
    const newUserPosition = board.querySelector(
      `tr:nth-child(${initialPosition.y + 1})>td:nth-child(${
        initialPosition.y
      })`
    );
    expect(newUserPosition.classList.contains('has-user')).toBe(true);
  });

  it('should move user up when up arrow key is pressed', () => {
    fireEvent.keyDown(board, {
      key: 'ArrowUp'
    });
    const newUserPosition = board.querySelector(
      `tr:nth-child(${initialPosition.y - 1})>td:nth-child(${
        initialPosition.y
      })`
    );
    expect(newUserPosition.classList.contains('has-user')).toBe(true);
  });
});

describe('Move counter', () => {
  it('should increase after valid step', () => {
    const { getByTestId } = render(
      <Game boardSizeX={boardSizeX} boardSizeY={boardSizeY} />
    );
    const board = getByTestId('game-table');
    fireEvent.keyDown(board, {
      key: 'ArrowUp'
    });
    const moveCounter = getByTestId('moveCounter');
    expect(Number(moveCounter.innerHTML)).toBe(1);
    fireEvent.keyDown(board, {
      key: 'ArrowUp'
    });
    expect(Number(moveCounter.innerHTML)).toBe(2);
  });

  it('should not increase move counter, when there is no place to move up', () => {
    // boardSizeX is so big, because has-sprite could start in the same position that
    // has-user. Then even that move was blocked, sprite is "collected" so game finished
    // before registering user didn't moved. There is still 1% chance this will crash.
    const { getByTestId } = render(<Game boardSizeX={100} boardSizeY={1} />);
    const board = getByTestId('game-table');
    fireEvent.keyDown(board, {
      key: 'ArrowUp'
    });
    const moveCounter = getByTestId('moveCounter');
    expect(Number(moveCounter.innerHTML)).toBe(0);
  });

  it('should not increase move counter, when there is no place to move down', () => {
    const { getByTestId } = render(<Game boardSizeX={100} boardSizeY={1} />);
    const board = getByTestId('game-table');
    fireEvent.keyDown(board, {
      key: 'ArrowDown'
    });
    const moveCounter = getByTestId('moveCounter');
    expect(Number(moveCounter.innerHTML)).toBe(0);
  });

  it('should not increase move counter, when there is no place to move left', () => {
    const { getByTestId } = render(<Game boardSizeX={1} boardSizeY={2} />);
    const board = getByTestId('game-table');
    fireEvent.keyDown(board, {
      key: 'ArrowLeft'
    });
    const moveCounter = getByTestId('moveCounter');
    expect(Number(moveCounter.innerHTML)).toBe(0);
  });

  it('should not increase move counter, when there is no place to move to right', () => {
    const { getByTestId } = render(<Game boardSizeX={1} boardSizeY={2} />);
    const board = getByTestId('game-table');
    fireEvent.keyDown(board, {
      key: 'ArrowRight'
    });
    const moveCounter = getByTestId('moveCounter');
    expect(Number(moveCounter.innerHTML)).toBe(0);
  });

  it('should show the score after game end', () => {
    const { getByTestId } = render(<Game boardSizeX={2} boardSizeY={1} />);
    const board = getByTestId('game-table');

    // because has-sprite can be on has-user tail, we have to move two directions, to get
    // the sprite that starts on initial user position
    fireEvent.keyDown(board, {
      key: 'ArrowLeft'
    });
    fireEvent.keyDown(board, {
      key: 'ArrowRight'
    });
    const moveCounter = getByTestId('moveCounter');
    expect(Number(moveCounter.innerHTML)).toBeGreaterThanOrEqual(1);
  });
});
