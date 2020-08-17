export const clickTile = tile => {
    return {
        type: 'CLICK_TILE',
        payload: tile
    };
};

export const pickPiece = position => {
    return {
        type: 'PICK_PIECE',
        payload: position
    };
};

export const dropPiece = position => {
    return {
        type: 'DROP_PIECE',
        payload: position
    };
};

export const undoMove = () => {
    return {
        type: 'UNDO_MOVE',
        payload: null
    };
};

export const redoMove = () => {
    return {
        type: 'UNDO_MOVE',
        payload: null
    };
};

export const resetBoard = () => {
    return {
        type: 'RESET_BOARD',
        payload: null
    };
};