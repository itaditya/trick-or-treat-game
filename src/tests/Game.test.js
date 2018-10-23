import React from "react";
import { render } from "react-testing-library";

import { Game } from "../Game";

test("react-testing-library works", () => {
  expect(1 + 2).toBe(3);
  const boardSizeX = 10;
  const boardSizeY = 10;
  const { getByTestId, container } = render(
    <Game boardSizeX={boardSizeX} boardSizeY={boardSizeY} />
  );

  const gameTable = getByTestId("game-table");
  expect(gameTable.children.length).toBe(1);
});
