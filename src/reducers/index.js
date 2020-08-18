import { combineReducers } from 'redux';

const BOARD_LAYOUT = [ // [Y][X]
[0, 0, 0, 2, 2, 2, 0, 0, 0],
[0, 0, 0, 2, 2, 2, 0, 0, 0],
[0, 0, 0, 2, 2, 2, 0, 0, 0],
[2, 2, 2, 2, 2, 2, 2, 2, 2],
[2, 2, 2, 2, 1, 2, 2, 2, 2],
[2, 2, 2, 2, 2, 2, 2, 2, 2],
[0, 0, 0, 2, 2, 2, 0, 0, 0],
[0, 0, 0, 2, 2, 2, 0, 0, 0],
[0, 0, 0, 2, 2, 2, 0, 0, 0]
];		
           
const boardReducer = (board = [], action) => {
    if (action.type === 'RESET_BOARD') {
        let board = [];
        for(let i = 0; i < BOARD_LAYOUT.length; i++) {
            let row = [];
            for(let j = 0; j < BOARD_LAYOUT[i].length; j++) {
                row.push({id: '' + i + j, status: ''+BOARD_LAYOUT[i][j]});
            }
            board.push(row)
        }
        return [...board];
    }

    // TODO: Refactor to access tile by coords instead of scanning arrays.
    if (action.type === 'CLICK_TILE') {
        board.forEach((row) => {
            row.forEach((tile) => {
                if(tile.id === action.payload.props.id)
                {
                    tile.status = tile.status === "2" ? "1" : "2";
                }
            });
        });
        return [...board];
    }

    return board;
}

export default combineReducers ({
    board: boardReducer,
})