import React from 'react';
import {useNavigate} from "react-router-dom";
import "../styles/home.scss"


const Home = () => {
    const navigate = useNavigate()

    return (
        <div className="home">
            <h1>Спектральный анализ</h1>

            <div className="homeButtons">
                <button onClick={() => navigate('/database')}>
                    <p>База результатов спектрального анализа</p>
                    <img width={200} height={180} src={require("../images/spectral-analysis-database.png")} alt=""/>
                </button>

                <button onClick={() => navigate('/substance-check')}>
                    <p>Проверка наличия и концентрации веществ</p>
                    <img width={180} height={180} src={require("../images/substance-check.png")} alt=""/>
                </button>
            </div>
        </div>
    );
};

export default Home;