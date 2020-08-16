import React, { Component } from 'react';

class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {status: (props.status || "off")};
        // Need to bind this to have acess to it inside the onClick function
        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        e.preventDefault();
        // Toogle Sattus
        this.setState({status: this.state.status === "on" ? "off" : "on"});
    }
    
    // Arrow functions automatically bind the value of this!!!
    // onClick = (e) => {
    //     e.preventDefault();
    //     // Toogle Sattus
    //     this.setState({status: this.state.status === "on" ? "off" : "on"});
    // }

    render() {
        const color = this.state.status === "on" ? "blue" : "grey lighten-2";

        return (
            <div style={{margin: '10px'}}>
                <a href="/#" className={`btn-floating btn-large waves-effect waves-light ${color}`} onClick={this.onClick}> </a>
            </div>
        )
    }
}

export default Button;