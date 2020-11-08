class GameBoard {
    static BOARD_LAYOUT = [ // [Y][X]
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

    constructor () {
        this.pickX = null;
        this.pickY = null;  
        this.board = [];
    }

    resetBoard () {
        this.board = [];
        for(let i = 0; i < GameBoard.BOARD_LAYOUT.length; i++) {
            let row = [];
            for(let j = 0; j < GameBoard.BOARD_LAYOUT[i].length; j++) {
                row.push({id: '' + i + j, status: ''+ GameBoard.BOARD_LAYOUT[i][j], posX: j, posY: i},);
            }
            this.board.push(row)
        }
        return [...this.board];
    }

    pick(posX, posY) {
        if(this.board[posY][posX].status === "2") {
            this.board[posY][posX].status = "3";
            this.pickX = posX;
            this.pickY = posY;  
        }
        else {
            this.pickX = null;
            this.pickY = null;  
        }
        return [...this.board];
    }

    undoMove() {
        // TODO: Implement undo
        console.log("undo")
        return [...this.board];
    }

    redoMove() {
        // TODO: Implement redo
        console.log("redo")
        return [...this.board];
    }

    validMove (dropX, dropY) {
        if(this.board[dropY][dropX].status === "1") { // target tile is free
            if(this.pickY === dropY) { // HORIZONTAL MOVE
                if(dropX - this.pickX === 2) { // moving 2 tiles to the right
                    if(this.board[this.pickY][this.pickX + 1].status === "2") { // middle tile is filled
                        return true;
                    }
                }
                if(dropX - this.pickX === -2) {// moving 2 tiles to the left
                    if(this.board[this.pickY][this.pickX - 1].status === "2") { // middle tile is filled
                        return true;
                    }
                }
            }
            if(this.pickX === dropX) { // HORIZONTAL MOVE
                if(dropY - this.pickY === 2) { // moving 2 tiles down
                    if(this.board[this.pickY + 1][this.pickX].status === "2") { // middle tile is filled
                        return true;
                    }
                }
                if(dropY - this.pickY === -2) {// moving 2 tiles up
                    if(this.board[this.pickY - 1][this.pickX].status === "2") { // middle tile is filled
                        return true;
                    }
                }
            }
        }
        return false;
    }
    
    unpick() {
        this.board[this.pickY][this.pickX].status = "2";
    }

    release() {
        if(this.pickX !== null) {
            this.board[this.pickY][this.pickX].status = "2";
        }
        return [...this.board];
    }

    // TODO: Implement save moves
    move(posX,posY) {
        if(this.validMove(posX,posY)) {
            this.board[this.pickY][this.pickX].status = "1";
            this.board[posY][posX].status = "2";
            if(this.pickY === posY) { // HORIZONTAL MOVE
                if(posX - this.pickX === 2) { // moving right
                    this.board[this.pickY][this.pickX + 1].status = "1";
                }
                else {
                    this.board[this.pickY][this.pickX - 1].status = "1";
                }
            }
            else { // HORIZONTAL MOVE
                if(posY - this.pickY === 2) { // moving down
                    this.board[this.pickY + 1][this.pickX].status = "1";
                }
                else {
                    this.board[this.pickY - 1][this.pickX].status = "1";
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
