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
    }

    saveBoard(saveArray) {
        saveArray.push(this.board.slice());
    }

    resetBoard() { // reducer
        this.restoreBoard(GameBoard.BOARD_LAYOUT.slice());
        this.undoHistory = [];
        this.redoHistory = [];
        return [...this.board];
    }

    pick(i) { // reducer
        if(this.board[i] === 2) {
            this.board[i] = 3;
            this.pickPos  = i;
        }
        else {
            this.pickPos = null;
        }
        return [...this.board];
    }

    undoMove() { // reducer
        if(this.undoHistory.length > 0) {
            this.saveBoard(this.redoHistory);
            this.restoreBoard(this.undoHistory.pop());
        }
        return [...this.board];
    }

    redoMove() { // reducer
        if(this.redoHistory.length > 0) {
            this.saveBoard(this.undoHistory);
            this.restoreBoard(this.redoHistory.pop());
        }
        return [...this.board];
    }

    unpick() {
        this.board[this.pickPos] = 2;
    }

    release() { // reducer
        if(this.pickPos !== null) {
            this.board[this.pickPos] = 2;
        }
        return [...this.board];
    }

    checkMove (dropPos) {
        if(this.board[dropPos] === 1) { // target tile is free
            if(Math.floor(this.pickPos / GameBoard.BOARD_SIZE) === Math.floor(dropPos / GameBoard.BOARD_SIZE)) { // HORIZONTAL MOVE
                if(dropPos - this.pickPos === 2) { // moving 2 tiles to the right
                    if(this.board[this.pickPos + 1] === 2) { // middle tile is filled
                        return 1; // MOVE RIGHT
                    }
                }
                if(dropPos - this.pickPos === -2) {// moving 2 tiles to the left
                    if(this.board[this.pickPos - 1] === 2) { // middle tile is filled
                        return 2; // MOVE LEFT
                    }
                }
            }
            if((this.pickPos % GameBoard.BOARD_SIZE) === (dropPos % GameBoard.BOARD_SIZE)) { // VERTICAL MOVE
                if(dropPos - this.pickPos === (2 * GameBoard.BOARD_SIZE)) { // moving 2 tiles down
                    if(this.board[this.pickPos + GameBoard.BOARD_SIZE] === 2) { // middle tile is filled
                        return 3; // MOVE DOWN
                    }
                }
                if(dropPos - this.pickPos === (-2 * GameBoard.BOARD_SIZE)) {// moving 2 tiles up
                    if(this.board[this.pickPos - GameBoard.BOARD_SIZE] === 2) { // middle tile is filled
                        return 4; // MOVE UP
                    }
                }
            }
        }
        return 0; // INVALID MOVE
    }
    
    move(dropPos) { // reducer
        var moveDir = this.checkMove(dropPos);
        if(moveDir !== 0) { // VALID MOVE
            this.board[this.pickPos] = 2;
            this.saveBoard(this.undoHistory);
            this.board[dropPos] = 2;
            this.board[this.pickPos] = 1;
            switch (moveDir) {
                case 1: // RIGHT
                    this.board[this.pickPos + 1] = 1;
                    break;
                case 2: // LEFT
                    this.board[this.pickPos - 1] = 1;
                    break;
                case 3: // DOWN
                    this.board[this.pickPos + GameBoard.BOARD_SIZE] = 1;
                    break;
                case 4: // UP
                    this.board[this.pickPos - GameBoard.BOARD_SIZE] = 1;
                    break;
                default:
                    break;
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