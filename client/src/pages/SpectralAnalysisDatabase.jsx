import React from 'react';
import Header from "../components/Header";
import CreateElement from "../components/CreateElement";
import ElementsList from "../components/ElementsList";
import "../styles/spectralAnalysisDatabase.scss"


const SpectralAnalysisDatabase = () => {

    return (
        <div className="spectral">
            <Header
                title="База результатов спектрального анализа"
                info={[
                    "Данное приложение помогает изучать спектральный анализ веществ.",
                    "Загрузите таблицу с результатами исследования вещества и вы получите список его пиков, затем можно выгрузить полученный результат в базу данных.",
                    "Обратите внимание, что загружаемый файл должен иметь расширение .xls или .xslx, а так же содержать информацию в указанном формате."
                ]}
            />
            <CreateElement/>
            <ElementsList/>
        </div>
    );
};

export default SpectralAnalysisDatabase;