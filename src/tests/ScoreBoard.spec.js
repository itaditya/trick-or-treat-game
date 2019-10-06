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
    expect(container.querySelectorAll('li')[0].querySelector('strong').innerHTML).toEqual('Andy')
    expect(container.querySelectorAll('li')[0].querySelector('span').innerHTML).toEqual(': 8 moves')
    expect(container.querySelectorAll('li')[1].querySelector('strong').innerHTML).toEqual('Bill')
    expect(container.querySelectorAll('li')[1].querySelector('span').innerHTML).toEqual(': 10 moves')
    expect(container.querySelectorAll('li')[2].querySelector('strong').innerHTML).toEqual('John')
    expect(container.querySelectorAll('li')[2].querySelector('span').innerHTML).toEqual(': 20 moves')
  })
});

