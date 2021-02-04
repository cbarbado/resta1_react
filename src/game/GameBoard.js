class GameBoard {
    // 0 -> disabled; 1 -> empty; 2 -> filled; 3 -> picked
    static BOARD_LAYOUT = [ 0, 0, 0, 2, 2, 2, 0, 0, 0,
                            0, 0, 0, 2, 2, 2, 0, 0, 0,
                            0, 0, 0, 2, 2, 2, 0, 0, 0,
                            2, 2, 2, 2, 2, 2, 2, 2, 2,
                            2, 2, 2, 2, 1, 2, 2, 2, 2,
                            2, 2, 2, 2, 2, 2, 2, 2, 2,
                            0, 0, 0, 2, 2, 2, 0, 0, 0,
                            0, 0, 0, 2, 2, 2, 0, 0, 0,
                            0, 0, 0, 2, 2, 2, 0, 0, 0
                          ];

    static BOARD_SIZE = 9;

    constructor () {
        this.pickPos     = null;
        this.board       = [];
        this.undoHistory = [];
        this.redoHistory = [];
    }

    restoreBoard(board) {
        this.board = board.slice();
        return [...this.board];
    }

    saveBoard(saveArray) {
        saveArray.push(this.board.slice());
    }

    resetBoard() {
        this.board = GameBoard.BOARD_LAYOUT.slice();
        return [...this.board];
    }

    pick(i) {
        if(this.board[i] === 2) {
            this.board[i] = 3;
            this.pickPos  = i;
        }
        else {
            this.pickPos = null;
        }
        return [...this.board];
    }

    undoMove() {
        if(this.undoHistory.length > 0) {
            this.saveBoard(this.redoHistory);
            this.restoreBoard(this.undoHistory.pop());
        }
        return [...this.board];
    }

    redoMove() {
        if(this.redoHistory.length > 0) {
            this.saveBoard(this.undoHistory);
            this.restoreBoard(this.redoHistory.pop());
        }
        return [...this.board];
    }

    validMove (dropPos) {
        if(this.board[dropPos] === 1) { // target tile is free
            if(Math.floor(this.pickPos / GameBoard.BOARD_SIZE) === Math.floor(dropPos / GameBoard.BOARD_SIZE)) { // HORIZONTAL MOVE
                if(dropPos - this.pickPos === 2) { // moving 2 tiles to the right
                    if(this.board[this.pickPos + 1] === 2) { // middle tile is filled
                        return true;
                    }
                }
                if(dropPos - this.pickPos === -2) {// moving 2 tiles to the left
                    if(this.board[this.pickPos - 1] === 2) { // middle tile is filled
                        return true;
                    }
                }
            }
            if((this.pickPos % GameBoard.BOARD_SIZE) === (dropPos % GameBoard.BOARD_SIZE)) { // HORIZONTAL MOVE
                if(dropPos - this.pickPos === (2 * GameBoard.BOARD_SIZE)) { // moving 2 tiles down
                    if(this.board[this.pickPos + GameBoard.BOARD_SIZE] === 2) { // middle tile is filled
                        return true;
                    }
                }
                if(dropPos - this.pickPos === (-2 * GameBoard.BOARD_SIZE)) {// moving 2 tiles up
                    if(this.board[this.pickPos - GameBoard.BOARD_SIZE] === 2) { // middle tile is filled
                        return true;
                    }
                }
            }
        }
        return false;
    }
    
    unpick() {
        this.board[this.pickPos] = 2;
    }

    release() {
        if(this.pickPos !== null) {
            this.board[this.pickPos] = 2;
        }
        return [...this.board];
    }

    move(dropPos) {
        if(this.validMove(dropPos)) {
            this.board[this.pickPos] = 2;
            this.saveBoard(this.undoHistory);
            this.board[dropPos] = 2;
            this.board[this.pickPos] = 1;
            if(Math.floor(this.pickPos / GameBoard.BOARD_SIZE) === Math.floor(dropPos / GameBoard.BOARD_SIZE)) { // HORIZONTAL MOVE
                if(dropPos - this.pickPos === 2) { // moving right
                    this.board[this.pickPos + 1] = 1;
                }
                else {
                    this.board[this.pickPos - 1] = 1;
                }
            }
            else { // VERTICAL MOVE
                if(dropPos - this.pickPos === (2 * GameBoard.BOARD_SIZE)) { // moving 2 tiles down
                    this.board[this.pickPos + GameBoard.BOARD_SIZE] = 1;
                }
                else {
                    this.board[this.pickPos - GameBoard.BOARD_SIZE] = 1;
                }
            }
        }
        else {
            this.unpick();
        }

        this.pickPos = null;

        return [...this.board];
    }
}

export default GameBoard;