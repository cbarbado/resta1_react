import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pickPiece, dropPiece, releasePiece } from '../actions';

class Tile extends Component {
    constructor(props) {
        super(props);
        // Need to bind this to have acess to it inside the onClick function.
        // Another option is to convert onClick to and arrow function, since
        // arrow functions automatically bind the value of this!!!
        // this.onClick = this.onClick.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onDrag = this.onDrag.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    onDrop(e) {
        this.props.dropPiece(this);
    }

    onDrag(e) {
        this.props.pickPiece(this);
    }

    onDragEnd(e) {
        this.props.releasePiece(this);
    }

    renderTile() {
        switch (this.props.status) {
            case "1":
                return <button
                            onDrop={(e) => {this.onDrop(e)}}
                            onDragOver={(e) => e.preventDefault()}
                            onDragEnd={(e) => {this.onDragEnd(e)}}
                            className={'btn-floating waves-effect waves-light grey lighten-2'}>
                        </button>
            case "2":
                return <button
                            draggable="true"
                            onDragStart={(e) => {this.onDrag(e)}}
                            onDrop={(e) => {this.onDrop(e)}}
                            onDragOver={(e) => e.preventDefault()}
                            onDragEnd={(e) => {this.onDragEnd(e)}}
                            className={'btn-floating waves-effect waves-light blue'}>
                        </button>
            case "3":
                return <button
                            onDrop={(e) => {this.onDrop(e)}}
                            onDragOver={(e) => e.preventDefault()}
                            onDragEnd={(e) => {this.onDragEnd(e)}}
                            className={'btn-floating waves-effect waves-light blue lighten-4'}>
                        </button>
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

export default connect(mapStateToProps, { pickPiece, dropPiece, releasePiece })(Tile);