import React from "react";
import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'
import { render, queryByAttribute } from "react-testing-library";
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

});