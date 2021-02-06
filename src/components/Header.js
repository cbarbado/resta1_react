import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetBoard, undoMove, redoMove } from '../actions';

import './Header.css';

class Header extends Component {
    onReplay = (e) => {
        e.preventDefault();
        this.props.resetBoard();
    }

    onUndo = (e) => {
        e.preventDefault();
        this.props.undoMove();
    }

    onRedo = (e) => {
        e.preventDefault();
        this.props.redoMove();
    }

    render() {
        var undoLinkStatus = this.props.header.undo ? "" : "disabled";
        var redoLinkStatus = this.props.header.redo ? "" : "disabled";
        return (
            <nav>
                <div className="nav-wrapper" style={{marginLeft: '15px'}}>
                    <span className="left brand-logo">
                        Peg Solitaire
                    </span>
                    <ul className="right">
                        <li><a href="/#" className={undoLinkStatus} onClick={this.onUndo}><i className="material-icons" style={{fontSize: "40px"}}>undo</i></a></li>
                        <li><a href="/#" className={redoLinkStatus}  onClick={this.onRedo}><i className="material-icons" style={{fontSize: "40px"}}>redo</i></a></li>
                        <li><a href="/#" onClick={this.onReplay}><i className="material-icons" style={{fontSize: "40px"}}>replay</i></a></li>
                    </ul>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = (state) => {
    return { header: state.header };
}

export default connect(mapStateToProps, { resetBoard, undoMove, redoMove })(Header);