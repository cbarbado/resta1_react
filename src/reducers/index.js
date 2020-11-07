import { combineReducers } from 'redux';

// TODO: move to Board object
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

// TODO: move to Board object
let pickX = null;
let pickY = null;  

// TODO: move game logic to a game controller
const validMove = (board, pickX, pickY, dropX, dropY) => {
    if(board[dropY][dropX].status === "1") { // target tile is free
        if(pickY === dropY) { // HORIZONTAL MOVE
            if(dropX - pickX === 2) { // moving 2 tiles to the right
                if(board[pickY][pickX + 1].status === "2") { // middle tile is filled
                    return true;
                }
            }
            if(dropX - pickX === -2) {// moving 2 tiles to the left
                if(board[pickY][pickX - 1].status === "2") { // middle tile is filled
                    return true;
                }
            }
        }
        if(pickX === dropX) { // HORIZONTAL MOVE
            if(dropY - pickY === 2) { // moving 2 tiles down
                if(board[pickY + 1][pickX].status === "2") { // middle tile is filled
                    return true;
                }
            }
            if(dropY - pickY === -2) {// moving 2 tiles up
                if(board[pickY - 1][pickX].status === "2") { // middle tile is filled
                    return true;
                }
            }
        }
    }

    return false;
}

const move = (board, pickX, pickY, dropX, dropY) => {
    board[pickY][pickX].status = "1";
    board[dropY][dropX].status = "2";
    if(pickY === dropY) { // HORIZONTAL MOVE
        if(dropX - pickX === 2) { // moving right
            board[pickY][pickX + 1].status = "1";
        }
        else {
            board[pickY][pickX - 1].status = "1";
        }
    }
    else { // HORIZONTAL MOVE
        if(dropY - pickY === 2) { // moving down
            board[pickY + 1][pickX].status = "1";
        }
        else {
            board[pickY - 1][pickX].status = "1";
        }
    }
}

const pick = (board, posX, posY) => {
    if(board[posY][posX].status === "2") {
        board[posY][posX].status = "1";
        pickX = posX;
        pickY = posY;  
    }
    else {
        pickX = null;
        pickY = null;  
    }
}

const unpick = (board, pickX, pickY) => {
    board[pickY][pickX].status = "2";
    // pickX = null;
    // pickY = null;  
}

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

        pick(board, posX, posY);

        return [...board];
    }

    if (action.type === 'DROP_PIECE') {
        const posX = parseInt(action.payload.props.id) % 10;
        const posY = parseInt(parseInt(action.payload.props.id) / 10);

        if(validMove(board,pickX,pickY,posX,posY)) {
            console.log("VALID");
            move(board,pickX,pickY,posX,posY)
        }
        else {
            unpick(board, pickX, pickY);
        }

        pickX = null;
        pickY = null;

        return [...board];
    }

    if (action.type === 'RELEASE_PIECE') {
        //TODO: release function
        if(pickX !== null) {
            board[pickY][pickX].status = "2";
        }

        return [...board];
    }

    return board;
}

export default combineReducers ({
    board: boardReducer,
})