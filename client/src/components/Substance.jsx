import React from 'react';
import axios from "axios";

const Substance = ({id, name, max, percentages}) => {
    const deleteSubstance = async () => {
        await axios.post("http://89.108.77.219:4000/api/delete-substance", {id: id, name: name})
        document.location.reload()
    }

    return (
        <div className="substance">
            <div className="substanceWrapper">
                <div className="substanceName">{name}</div>
                <div>Характерный пик: {max}</div>
                {percentages.length > 0 ?
                    <div>
                        <p>Зависимость высоты пика от концентрации:</p>
                        {percentages.map(percentage =>
                            <p key={percentage.value}>{percentage.value} - {percentage.percent}%</p>
                        )}
                    </div>
                    :
                    <div></div>
                }
            </div>
            <button onClick={deleteSubstance}>Удалить</button>
        </div>
    );
};

export default Substance;