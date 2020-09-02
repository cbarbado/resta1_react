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

let pickX = null;
let pickY = null;  
           
const boardReducer = (board = [], action) => {
    if (action.type === 'RESET_BOARD') {
        let board = [];
        for(let i = 0; i < BOARD_LAYOUT.length; i++) {
            let row = [];
            for(let j = 0; j < BOARD_LAYOUT[i].length; j++) {
                row.push({id: '' + i + j, status: ''+BOARD_LAYOUT[i][j], posX: j, posY: i},);
            }
            board.push(row)
        }
        return [...board];
    }

    if (action.type === 'PICK_PIECE') {
        const posX = parseInt(action.payload.props.id) % 10;
        const posY = parseInt(parseInt(action.payload.props.id) / 10);

        if(board[posY][posX].status === "2") {
            board[posY][posX].status = "1";
            pickX = posX;
            pickY = posY;  
        }
        else {
            pickX = null;
            pickY = null;  
        }
        
        return [...board];
    }

    // TODO: include game logic to check if the move is valid
    // TODO: move game logic to a game controller
    if (action.type === 'DROP_PIECE') {
        const posX = parseInt(action.payload.props.id) % 10;
        const posY = parseInt(parseInt(action.payload.props.id) / 10);

        if(board[posY][posX].status === "1") {
            board[posY][posX].status = "2";
        }
        else {
            board[pickY][pickX].status = "2";
        }

        pickX = null;
        pickY = null;  

        return [...board];
    }

    if (action.type === 'RELEASE_PIECE') {
        if(pickX) {
            board[pickY][pickX].status = "2";
        }

        return [...board];
    }

    return board;
}

export default combineReducers ({
    board: boardReducer,
})