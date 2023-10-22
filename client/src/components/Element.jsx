import React from 'react';
import axios from "axios";

const Element = ({id, name, max, file}) => {

    const setSortTrue = () => {
        document.querySelector(`#s1${id}`).classList.remove("open")
        document.querySelector(`#s2${id}`).classList.add("open")
        document.querySelector(`#b1${id}`).classList.remove("chosen")
        document.querySelector(`#b2${id}`).classList.add("chosen")
    }
    const setSortFalse = () => {
        document.querySelector(`#s2${id}`).classList.remove("open")
        document.querySelector(`#s1${id}`).classList.add("open")
        document.querySelector(`#b2${id}`).classList.remove("chosen")
        document.querySelector(`#b1${id}`).classList.add("chosen")
    }

    const deleteElement = async () => {
        await axios.post("http://localhost:4000/api/delete-element", {id: id, name: name})
        document.location.reload()
    }

    const openElementResults = () => {
        if (document.querySelector(`#r${id}`).classList.contains("open")) {
            document.querySelector(`#r${id}`).classList.remove("open")
        } else {
            document.querySelector(`#r${id}`).classList.add("open")

        }
    }

    return (
        <div className="element">
            <div className="elementMain">
                <div className="elementInfo">
                    <div>{name}</div>
                    <a target="_blank" rel="noreferrer" href={"http://localhost:4000/" + file}>Скачать файл</a>
                </div>

                <button id="openElementResults" onClick={() => openElementResults(id)}>Информация</button>
                <button id="deleteElement" onClick={deleteElement}>Удалить</button>
            </div>


            <div id={`r${id}`} className="elementResults">
                <div className="elementResultsTop">
                    <div>Пик(длина волны):</div>
                    <div className="elementResultsTopSort">
                        Сортировка:
                        <div id={`b1${id}`} className="elementResultsTopSort1 chosen" onClick={setSortFalse}>по последовательности</div>
                        <div id={`b2${id}`} className="elementResultsTopSort2" onClick={setSortTrue}>по возрастанию</div>
                    </div>
                </div>
                <div id={`s1${id}`} className="elementResultsSort1 open">{max.map(element => <div key={element.id}>{element.max}({element.id * 2 + 400})</div>)}</div>
                <div id={`s2${id}`} className="elementResultsSort2">{max.sort((a, b) => a.max - b.max).map(element => <div key={element.id}>{element.max}({element.id * 2 + 400})</div>)}</div>
            </div>
        </div>
    );
};

export default Element;