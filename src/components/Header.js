import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetBoard } from '../actions';

class Header extends Component {
    onReplay = (e) => {
        e.preventDefault();
        this.props.resetBoard();
    }

    // TODO: Implement "undo" action.
    onUndo = (e) => {
        e.preventDefault();
    }

    // TODO: Implement "redo" action.
    onRedo = (e) => {
        e.preventDefault();
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper" style={{marginLeft: '15px'}}>
                    <span className="left brand-logo">
                        Peg Solitaire - React
                    </span>
                    <ul className="right">
                        <li><a href="/#" onClick={this.onUndo}><i className="material-icons" style={{fontSize: "40px"}}>undo</i></a></li>
                        <li><a href="/#" onClick={this.onRedo}><i className="material-icons" style={{fontSize: "40px"}}>redo</i></a></li>
                        <li><a href="/#" onClick={this.onReplay}><i className="material-icons" style={{fontSize: "40px"}}>replay</i></a></li>
                    </ul>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = (state) => {
    return { board: state.board };
}

export default connect(mapStateToProps, { resetBoard })(Header);