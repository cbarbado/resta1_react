import React, { Component } from 'react';

class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {status: (props.status || "off")};
    }

    toogleStatus = () => {
        this.setState({status: this.state.status === "on" ? "off" : "on"});
    }

    render() {
        const color = this.state.status === "on" ? "blue" : "grey lighten-2";

        return (
            <div style={{margin: '10px'}}>
                <a href="/#" className={`btn-floating btn-large waves-effect waves-light ${color}`} onClick={this.toogleStatus}> </a>
            </div>
        )
    }
}

export default Button;