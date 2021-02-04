class GameBoard {
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
        this.pickX = null;
        this.pickY = null;  
        this.board = [];
        this.boardHistory = [];
    }

    linearPos(x,y) {
        return (y * GameBoard.BOARD_SIZE + x);
    }

    matrixPos(i) {
        return {x: i % (GameBoard.BOARD_SIZE), y: Math.floor(i / GameBoard.BOARD_SIZE)};
    }

    restoreBoard(board) {
        this.board = board.slice();
        return [...this.board];
    }

    saveBoard() {
        this.boardHistory.push(this.board.slice());
        console.log(this.boardHistory)
    }

    resetBoard() {
        this.board = GameBoard.BOARD_LAYOUT.slice();
        return [...this.board];
    }

    pick(i) {
        var pos = this.matrixPos(i);
        if(this.board[this.linearPos(pos.x,pos.y)] === 2) {
            this.board[this.linearPos(pos.x,pos.y)] = 3;
            this.pickX = pos.x;
            this.pickY = pos.y;  
        }
        else {
            this.pickX = null;
            this.pickY = null;  
        }
        return [...this.board];
    }

    undoMove() {
        if(this.boardHistory.length > 0) {
            this.restoreBoard(this.boardHistory.pop());
        }
        return [...this.board];
    }

    redoMove() {
        // TODO: Implement redo
        console.log("redo")
        return [...this.board];
    }

    validMove (dropX, dropY) {
        if(this.board[this.linearPos(dropX,dropY)] === 1) { // target tile is free
            if(this.pickY === dropY) { // HORIZONTAL MOVE
                if(dropX - this.pickX === 2) { // moving 2 tiles to the right
                    if(this.board[this.linearPos(this.pickX + 1,this.pickY)] === 2) { // middle tile is filled
                        return true;
                    }
                }
                if(dropX - this.pickX === -2) {// moving 2 tiles to the left
                    if(this.board[this.linearPos(this.pickX - 1,this.pickY)] === 2) { // middle tile is filled
                        return true;
                    }
                }
            }
            if(this.pickX === dropX) { // HORIZONTAL MOVE
                if(dropY - this.pickY === 2) { // moving 2 tiles down
                    if(this.board[this.linearPos(this.pickX,this.pickY + 1)] === 2) { // middle tile is filled
                        return true;
                    }
                }
                if(dropY - this.pickY === -2) {// moving 2 tiles up
                    if(this.board[this.linearPos(this.pickX, this.pickY - 1)] === 2) { // middle tile is filled
                        return true;
                    }
                }
            }
        }
        return false;
    }
    
    unpick() {
        this.board[this.linearPos(this.pickX, this.pickY)] = 2;
    }

    release() {
        if(this.pickX !== null) {
            this.board[this.linearPos(this.pickX,this.pickY)] = 2;
        }
        return [...this.board];
    }

    // TODO: Implement save moves
    move(i) {
        var pos = this.matrixPos(i);
        if(this.validMove(pos.x,pos.y)) {
            this.board[this.linearPos(this.pickX,this.pickY)] = 2;
            this.saveBoard();
            this.board[this.linearPos(pos.x,pos.y)] = 2;
            this.board[this.linearPos(this.pickX,this.pickY)] = 1;
            if(this.pickY === pos.y) { // HORIZONTAL MOVE
                if(pos.x - this.pickX === 2) { // moving right
                    this.board[this.linearPos(this.pickX + 1,this.pickY)] = 1;
                }
                else {
                    this.board[this.linearPos(this.pickX - 1, this.pickY)] = 1;
                }
            }
            else { // HORIZONTAL MOVE
                if(pos.y - this.pickY === 2) { // moving down
                    this.board[this.linearPos(this.pickX,this.pickY + 1)] = 1;
                }
                else {
                    this.board[this.linearPos(this.pickX, this.pickY - 1)] = 1;
                }
            }
        }
        else {
            this.unpick();
        }

        this.pickX = null;
        this.pickY = null;

        return [...this.board];
    }
}

export default GameBoard;