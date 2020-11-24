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

    renderRow(row) {
        return(
            row.map((col) => {
                return(
                    <div key={col.id} className="tile">
                        <Tile id={col.id} status={col.status}/>
                    </div>
                );
            })
        );
    }

    renderBoard() {
        return this.props.board.map((row) => {
            return (
                this.renderRow(row)
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