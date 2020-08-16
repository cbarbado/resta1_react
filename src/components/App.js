import React from "react";
import Button from "./Button";
import Header from "./Header";

const App = () => {
    return(
        <div className="container">
            <Header />
            <br/>
            <div>Hi There. Click the buttons!</div>
            <br/>
            <Button status="off"/>
            <Button status="on"/>
            <Button/>
        </div>
    );
};

export default App;