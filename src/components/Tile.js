import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clickTile } from '../actions';

class Tile extends Component {
    constructor(props) {
        super(props);
        // Need to bind this to have acess to it inside the onClick function.
        // Another option is to convert onClick to and arrow function, since
        // arrow functions automatically bind the value of this!!!
        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        e.preventDefault();
        this.props.clickTile(this)
    }

    renderTile() {
        switch (this.props.status) {
            case "1":
                return <button className={'btn-floating btn-large waves-effect waves-light grey lighten-2'} onClick={this.onClick}> </button>
            case "2":
                return <button className={'btn-floating btn-large waves-effect waves-light blue'} onClick={this.onClick}> </button>
            default:
                return <p></p>
        }
    }
    
    render() {
        return (
            <div>
                {this.renderTile()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { board: state.board };
}

export default connect(mapStateToProps, { clickTile })(Tile);