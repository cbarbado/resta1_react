import React from "react";
import Board from "./Board";
import Header from "./Header";

const App = () => {
    return(
        <div className="container">
            <Header />
            <br/>
            <div>Hi There. Click the buttons!</div>
            <br/>
            <Board/>
        </div>
    );
};

export default App;