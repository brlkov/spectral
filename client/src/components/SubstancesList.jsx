import React, {useEffect, useState} from 'react';
import axios from "axios";
import Substance from "./Substance";


const SubstancesList = () => {
    const [substances, setSubstances] = useState([])
    const [percentages, setPercentages] = useState([])

    useEffect(() => {
        getElements().then(response => {
            setSubstances(response.data.filter(item => item.id !== "percentages"))
            setPercentages(response.data.find(item => item.id === "percentages").items)
        })
    }, [])

    const getElements = async () => {
        return await axios.get("http://localhost:4000/api/get-substances")
    }

    return (
        <div className="substancesList">
            <h2>Список простых веществ:</h2>
            {substances.map(substance =>
                <div key={substance.id}>
                    <Substance id={substance.id} name={substance.name} max={substance.max} percentages={percentages.filter(percentage => percentage.substanceId === substance.id)}/>
                </div>
            )}
        </div>
    );
};

export default SubstancesList;