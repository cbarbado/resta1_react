import React, { Component } from 'react';
import { connect } from 'react-redux';

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
                    <div key={col.id} className="col s1 nomargin">
                        <Tile id={col.id} status={col.status}/>
                    </div>
                );
            })
        );
    }

    renderBoard() {
        let count = 0;
        return this.props.board.map((row) => {
            const row_key = "row" + count++;
            return (
                <div key={row_key} className="row">
                    <div className="flexbox">
                        {this.renderRow(row)}
                    </div>
                </div>
            );
        });
    }

    render() {
        return (
            <div>
                {this.renderBoard()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { board: state.board };
}

export default connect(mapStateToProps, { resetBoard })(Board);