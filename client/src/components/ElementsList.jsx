import React, {useState, useEffect, useMemo} from 'react';
import axios from "axios";
import Element from "./Element";

const ElementsList = () => {
    const [elements, setElements] = useState([])
    const [searchName, setSearchName] = useState('')
    const [searchMin, setSearchMin] = useState('')
    const [searchMax, setSearchMax] = useState('')

    useEffect(() => {
        getElements().then(response => setElements(response.data))
    }, [])

    const getElements = async () => {
        return await axios.get("http://89.108.77.219:4000/api/get-elements")
    }


    const searchNamesElements = useMemo(()=> {
        if(searchName) {
            return elements.filter(element => element.name.toLowerCase().includes(searchName))
        }
        return elements;
    }, [searchName, elements])

    const searchNamesMinMaxElements = useMemo(()=> {
        if(searchMin && searchMax) {
            return searchNamesElements.filter(element =>
                (Math.min.apply(null, (JSON.parse(element.max).map(elem => elem.max))) >= searchMin) &&
                (Math.max.apply(null, (JSON.parse(element.max).map(elem => elem.max))) <= searchMax)
            )
        }
        else if(searchMin) {
            return searchNamesElements.filter(element => Math.min.apply(null, (JSON.parse(element.max).map(elem => elem.max))) >= searchMin)
        }
        else if(searchMax) {
            return searchNamesElements.filter(element => Math.max.apply(null, (JSON.parse(element.max).map(elem => elem.max))) <= searchMax)
        }
        return searchNamesElements;
    }, [searchMin, searchMax, searchNamesElements])


    return (
        <div className="elementsList">
            <h2>Поиск:</h2>

            <div className="search">
                <input
                    value={searchName}
                    onChange={event => setSearchName(event.target.value)}
                    placeholder="Название"
                    type="text"
                />
                <input
                    value={searchMin}
                    onChange={event => setSearchMin(event.target.value)}
                    placeholder="Минимум"
                    type="text"
                />
                <input
                    value={searchMax}
                    onChange={event => setSearchMax(event.target.value)}
                    placeholder="Максимум"
                    type="text"
                />
            </div>

            <h2>Список веществ:</h2>
            {searchNamesMinMaxElements.map(element =>
                <Element id={element.id} name={element.name} max={JSON.parse(element.max)} file={element.file} key={element.id}/>
            )}
        </div>
    );
};

export default ElementsList;