import React, { Component } from 'react';
import { connect } from 'react-redux';

//TODO: Make board responsive
import './Board.css';

import Tile from './Tile';
import { resetBoard } from '../actions';

class Board extends Component {
    componentDidMount() {
        this.props.resetBoard();
    }

    renderBoard() {
        return this.props.board.map((tile) => {
            return (
                <div key={tile.id} className="tile">
                    <Tile id={tile.id} status={tile.status}/>
                </div>
            );
        });
    }

    render() {
        return (
            <div className="content">
                <div className="board">
                    {this.renderBoard()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { board: state.board };
}

export default connect(mapStateToProps, { resetBoard })(Board);