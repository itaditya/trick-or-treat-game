import React from 'react';
import { render, cleanup, getNodeText } from 'react-testing-library';
import { ScoreBoard } from '../ScoreBoard';

const originalLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};

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

beforeEach(() => {
  global.window.localStorage = mockLocalStorage;
})

describe('ScoreBoard component', () => {
  it('should render component as null', () => {

    global.window.localStorage = originalLocalStorage;

    const { container } = render(<ScoreBoard />);
    expect(container.firstChild).toBeNull()
  }) 

  it('should render three scores as ordered list if three items are stored in localStorage', () => {
    const { container } = render(<ScoreBoard />);
    expect(container.querySelectorAll('li')[0].textContent).toEqual('Andy: 8 moves')
    expect(container.querySelectorAll('li')[1].textContent).toEqual('Bill: 10 moves')
    expect(container.querySelectorAll('li')[2].textContent).toEqual('John: 20 moves')
  })
});
