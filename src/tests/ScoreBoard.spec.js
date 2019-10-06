import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { ScoreBoard } from '../ScoreBoard';

const originalLocalStorage = global.window;

const mockLocalStorage = {
  getItem: function (key) {
    if (key === 'userMoves') {
      return JSON.stringify([
        { name: 'John', moves: 20 },
        { name: 'Andy', moves: 8 },
        { name: 'Bill', moves: 10 },
      ])
    }
  },
  setItem: jest.fn(),
  clear: jest.fn()
}

beforeAll(() => {
  global.localStorage = mockLocalStorage;
})

describe('ScoreBoard component', () => {
  it('Should render correctly', () => {
    const { container } = render(<ScoreBoard />);
    expect(container.querySelectorAll('li')).toHaveLength(3)
  })
});

