import React from "react";
// add some helpful assertions
import 'jest-dom/extend-expect'
// this is basically: afterEach(cleanup)
import 'react-testing-library/cleanup-after-each'
import { render } from "react-testing-library";

import { Game } from "../Game";

describe('Game board', () => {
  it('should render correctly', () => {
    const boardSizeX = 10;
    const boardSizeY = 10;
    const { getByTestId } = render(
      <Game boardSizeX={boardSizeX} boardSizeY={boardSizeY} />
    );

    const gameTable = getByTestId("game-table");
    expect(gameTable).toBeVisible();
  });

});