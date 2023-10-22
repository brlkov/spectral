import React from "react";
import "./styles/styles.scss"
import Home from "./pages/Home";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import SpectralAnalysisDatabase from "./pages/SpectralAnalysisDatabase";
import SubstanceCheck from "./pages/SubstanceCheck";

function App() {

    return (
        <BrowserRouter basename="/">
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route exact path="/database" element={<SpectralAnalysisDatabase/>}/>
                <Route exact path="/substance-check" element={<SubstanceCheck/>}/>
                <Route path="*" element={<Navigate replace to="/"/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
