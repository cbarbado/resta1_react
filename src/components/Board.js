import React, { Component } from 'react';
import { connect } from 'react-redux';

import Tile from './Tile';

class Board extends Component {
    renderBoard() {
        return this.props.board.map((tile) => {
            return (
                <Tile key={tile.id} id={tile.id} status={tile.status}/>
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

export default connect(mapStateToProps)(Board);