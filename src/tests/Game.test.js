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

describe('User movement', () => {
    let board;
    let reactHashKey;

    beforeEach(() => {
        const { getByTestId, container } = render(
            <Game boardSizeX={boardSizeX} boardSizeY={boardSizeY} />
        );

        board = getByTestId('game-table');
        const user = container.querySelector('.has-user');
        reactHashKey = Object.keys(user)[0];
        const initialCoordinates = user[reactHashKey].key;
        expect(initialCoordinates).toBe('5-5');
    })

    it('should move user left when left arrow key is pressed', () => {
        fireEvent.keyDown(board, {
            key: 'ArrowLeft',
            keyCode: 37
        });

        const newUser = document.querySelector('.has-user');
        const positionAfterMove = newUser[reactHashKey].key;
        expect(positionAfterMove).toBe('5-4');
    });

    it('should move user right when right arrow key is pressed', () => {
        fireEvent.keyDown(board, {
            key: 'ArrowRight',
            keyCode: 39
        });

        const newUser = document.querySelector('.has-user');
        const positionAfterMove = newUser[reactHashKey].key;
        expect(positionAfterMove).toBe('5-6');
    });

    it('should move user down when down arrow key is pressed', () => {
        fireEvent.keyDown(board, {
            key: 'ArrowDown',
            keyCode: 40
        });

        const newUser = document.querySelector('.has-user');
        const positionAfterMove = newUser[reactHashKey].key;
        expect(positionAfterMove).toBe('6-5');
    });

    it('should move user up when up arrow key is pressed', () => {
        fireEvent.keyDown(board, {
            key: 'ArrowUp',
            keyCode: 38
        });

        const newUser = document.querySelector('.has-user');
        const positionAfterMove = newUser[reactHashKey].key;
        expect(positionAfterMove).toBe('4-5');
    });
});