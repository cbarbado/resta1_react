import React, { Component } from 'react';

class Header extends Component {
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
                        <li><a href="/#"><i className="material-icons" style={{fontSize: "40px"}}>replay</i></a></li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Header;