import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetBoard } from '../actions';

class Header extends Component {
    onReplay = (e) => {
        e.preventDefault();
        this.props.resetBoard();
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper" style={{marginLeft: '15px'}}>
                    <a href="/#" className="left brand-logo">
                        Peg Solitaire - React
                    </a>
                    <ul className="right">
                        <li><a href="/#"><i className="material-icons" style={{fontSize: "40px"}}>undo</i></a></li>
                        <li><a href="/#"><i className="material-icons" style={{fontSize: "40px"}}>redo</i></a></li>
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