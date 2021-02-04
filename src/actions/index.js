export const pickPiece = id => {
    return {
        type: 'PICK_PIECE',
        payload: id
    };
};

export const dropPiece = id => {
    return {
        type: 'DROP_PIECE',
        payload: id
    };
};

export const releasePiece = () => {
    return {
        type: 'RELEASE_PIECE',
        payload: null
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
        type: 'REDO_MOVE',
        payload: null
    };
};

export const resetBoard = () => {
    return {
        type: 'RESET_BOARD',
        payload: null
    };
};