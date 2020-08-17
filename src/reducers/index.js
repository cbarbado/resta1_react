import { combineReducers } from 'redux';

const boardReducer = (board = [], action) => {
    if (action.type === 'RESET_BOARD') {
        board = [{id: '1', status:'on'},{id: '2', status: 'off'}, {id: '3', status: 'on'}];
    }

    return board;

    // return [{id: '1', status:'on'},{id: '2', status: 'off'}, {id: '3', status: 'on'}];
}

export default combineReducers ({
    board: boardReducer,
})