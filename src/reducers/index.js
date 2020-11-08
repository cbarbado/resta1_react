import { combineReducers } from 'redux';

import GameBoard from '../game/GameBoard';
var gameBoard = new GameBoard();

const boardReducer = (board = [], action) => {
    if (action.type === 'RESET_BOARD') {
        return gameBoard.resetBoard();
    }

    if (action.type === 'PICK_PIECE') {
        const posX = parseInt(action.payload.props.id) % 10;
        const posY = parseInt(parseInt(action.payload.props.id) / 10);

        return gameBoard.pick(posX, posY);
    }

    if (action.type === 'DROP_PIECE') {
        const posX = parseInt(action.payload.props.id) % 10;
        const posY = parseInt(parseInt(action.payload.props.id) / 10);

        return gameBoard.move(posX,posY);
    }

    if (action.type === 'RELEASE_PIECE') {
        return gameBoard.release();
    }

    return board;
}

export default combineReducers ({
    board: boardReducer,
})