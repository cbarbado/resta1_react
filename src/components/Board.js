import React, { Component } from 'react';
import Button from './Button';

class Board extends Component {
    render() {
        return (
            <div>
                <Button status="off"/>
                <Button status="on"/>
                <Button/>
            </div>
        );
    }
}

export default Board;