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
    
    render() {
        const color = this.props.status === "on" ? "blue" : "grey lighten-2";
        return (
            <div style={{margin: '10px'}}>
                <a href="/#" className={`btn-floating btn-large waves-effect waves-light ${color}`} onClick={this.onClick}> </a>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { board: state.board };
}

export default connect(mapStateToProps, { clickTile })(Tile);