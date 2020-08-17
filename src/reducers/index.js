import { combineReducers } from 'redux';

const boardReducer = (board = [], action) => {
    if (action.type === 'RESET_BOARD') {
        board = [{id: '1', status:'on'},{id: '2', status: 'off'}, {id: '3', status: 'on'}];
    }

    if (action.type === 'CLICK_TILE') {
        board.forEach((tile) => {
            if(tile.id === action.payload.props.id)
            {
                tile.status = tile.status === "on" ? "off" : "on";
            }
        });
        board = [...board];
    }

    return board;
}

export default combineReducers ({
    board: boardReducer,
})