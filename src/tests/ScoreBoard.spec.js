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
  it('should render three items in list if three items are stored in localStorage', () => {
    const { container } = render(<ScoreBoard />);
    expect(container.querySelectorAll('li')).toHaveLength(3)
  }) 

  it('Should render 3 list correctly', () => {
    const { container } = render(<ScoreBoard />);
    expect(container.querySelectorAll('li')[0].innerText).toEqual('Andy: 8 moves')
    expect(container.querySelectorAll('li')[1].innerText).toEqual('Bill: 10 moves')
    expect(container.querySelectorAll('li')[1].innerText).toEqual('John: 20 moves')
  })
});

