import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from './Button';

class Board extends Component {
    renderButtons() {
        return this.props.board.map((tile) => {
            return (
                <Button key={tile.id} status={tile.status}/>
            );
        });
    }

    render() {
        return (
            <div>
                {this.renderButtons()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { board: state.board};
}

export default connect(mapStateToProps)(Board);