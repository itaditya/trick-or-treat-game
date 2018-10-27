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
        expect(spriteTiles).toHaveLength(10);
    });
});