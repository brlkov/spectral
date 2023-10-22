import React from 'react';

const Header = ({title, info}) => {

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
                <h1>{title}</h1>
                <button onClick={openCloseWindow}>i</button>
            </div>

            <div className="headerInfo">
                <div>
                    {info.map(paragraph =>
                        <p key={paragraph}>{paragraph}</p>
                    )}
                </div>
                <img width={410} height={300} src={require("../images/table.png")} alt=""/>
            </div>
        </div>
    );
};

export default Header;