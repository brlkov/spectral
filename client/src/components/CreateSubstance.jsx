import React, {useState} from 'react';
import axios from "axios";


const CreateSubstance = () => {
    const [name, setName] = useState('')
    const [max, setMax] = useState('')
    const [concentrations, setConcentrations] = useState([])

    const addConcentration = () => {
        setConcentrations([...concentrations, {value: "", percentage: "", id: Date.now()}])
    }
    const removeConcentration = (id) => {
        setConcentrations(concentrations.filter(concentration => concentration.id !== id))
    }
    const changeConcentration = (key, value, id) => {
        setConcentrations(concentrations.map(concentration => concentration.id === id ? {...concentration, [key]: value} : concentration))
    }

    const addSubstance = async () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('max', max)
        formData.append('concentrations', JSON.stringify(concentrations))
        await axios.post("http://89.108.77.219:4000/api/substance", formData).then(res => document.location.reload())
    }

    return (
        <div className="newSubstance">
            <h2>Добавить простое вещество:</h2>

            <div className="newSubstanceTools">
                <div className="newSubstanceToolsTop">
                    <input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Название"
                    />
                    <input
                        id="max"
                        value={max}
                        onChange={(e) => setMax(e.target.value)}
                        type="number"
                        placeholder="Характерный пик"
                    />
                </div>

                {name && max ?
                    <div className="newSubstanceToolsMiddle">
                        <div className="newSubstanceToolsConcentration">
                            <p>Зависимость высоты пика от концентрации</p>
                            <button onClick={addConcentration}>
                                Добавить
                            </button>
                        </div>
                        {concentrations.map(concentration =>
                            <div className="newSubstanceToolsInputs" key={concentration.id}>
                                <input
                                    type="number"
                                    value={concentration.value}
                                    onChange={e => changeConcentration("value", e.target.value, concentration.id)}
                                    placeholder="Значение"
                                />
                                <input
                                    value={concentration.percentage}
                                    onChange={e => changeConcentration("percentage", e.target.value, concentration.id)}
                                    placeholder="Концентрация"
                                />
                                <button onClick={() => removeConcentration(concentration.id)}>Удалить</button>
                            </div>
                        )}
                    </div>
                    :
                    <></>
                }

                {(name && max && concentrations.length === 0) || (name && max && concentrations.filter(concentration => concentration.value === "").length === 0 && concentrations.filter(concentration => concentration.percentage === "").length === 0)
                    ?
                    <button onClick={addSubstance}>Создать вещество</button>
                    :
                    <div></div>
                }
            </div>
        </div>
    );
};

export default CreateSubstance;