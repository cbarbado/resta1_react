import React from "react";
import Board from "./Board";
import Header from "./Header";
import Footer from "./Footer";

// TODO: add footer
const App = () => {
    return(
        <div className="container">
            <Header />
            <br/>
            <Board />
            <br/>
            <Footer/>
        </div>
    );
};

export default App;