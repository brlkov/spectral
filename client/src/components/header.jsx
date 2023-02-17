import React from 'react';

const Header = () => {

    const openCloseWindow = () => {
        if (document.querySelector(".headerInfo").classList.contains("open")) {
            document.querySelector(".headerInfo").classList.remove("open")
        } else {
            document.querySelector(".headerInfo").classList.add("open")

        }
    }

    return (
        <div className="header">
            <div className="headerMain">
                <p>Спектральный анализ</p>
                <button onClick={openCloseWindow}>i</button>
            </div>

            <div className="headerInfo">
                <div>
                    <p>Данное приложение помогает изучать спектральный анализ веществ.</p>
                    <p>Загрузите таблицу с результатами исследования вещества и вы получите список его пиков, затем можно выгрузить полученный результат в базу данных.</p>
                    <p>Обратите внимание, что загружаемый файл должен иметь расширение .xls или .xslx, а так же содержать информацию в указанном формате.</p>
                </div>
                <img width={410} height={300} src={require("../images/table.png")} alt=""/>
            </div>
        </div>
    );
};

export default Header;