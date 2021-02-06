import { combineReducers } from 'redux';

import GameBoard from '../game/GameBoard';
var gameBoard = new GameBoard();

const boardReducer = (board = [], action) => {
    if (action.type === 'RESET_BOARD') {
        return gameBoard.resetBoard();
    }

    if (action.type === 'PICK_PIECE') {
        return gameBoard.pick(action.payload.props.id);
    }

    if (action.type === 'DROP_PIECE') {
        return gameBoard.move(action.payload.props.id);
    }

    if (action.type === 'RELEASE_PIECE') {
        return gameBoard.release();
    }

    if (action.type === 'UNDO_MOVE') {
        return gameBoard.undoMove();
    }

    if (action.type === 'REDO_MOVE') {
        return gameBoard.redoMove();
    }

    return board;
}

const initState = {
    undo: 0,
    redo: 0
}
const headerReducer = (undo = initState, action) => {
    return {undo: gameBoard.undoHistory.length, redo: gameBoard.redoHistory.length}
}

export default combineReducers ({
    board: boardReducer,
    header: headerReducer,
})