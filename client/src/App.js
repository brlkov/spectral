import React from "react";
import CreateElement from "./components/createElement";
import ElementsList from "./components/elementsList";
import Header from "./components/header";
import "./style.scss"

function App() {

    return (
        <div className="spectral">
            <Header/>
            <CreateElement/>
            <ElementsList/>
        </div>
    );
}

export default App;
