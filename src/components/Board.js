import React, { Component } from 'react';
import { connect } from 'react-redux';

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
                    <div key={col.id} className="col s1">
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
                    <div className="col s1">
                    </div>
                    {this.renderRow(row)}
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