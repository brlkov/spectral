import React, {useRef, useState} from 'react';
import axios from "axios";

const CheckConcentration = () => {
    const [file, setFile] = useState(null)
    const [response, setResponse] = useState([])
    const chooseMessage = useRef()

    const check = async () => {
        const formData = new FormData()
        formData.append('file', file)
        await axios.post("http://89.108.77.219:4000/api/check", formData).then(res => {
            setResponse(res.data)
            console.log(res.data)
        })
        document.querySelector(".checkConcentrationResults").classList.add("open")
    }

    const deleteNew = () => {
        setFile(null)
        setResponse([])
        chooseMessage.current.textContent = "Выбрать файл"
        document.querySelector(".checkConcentrationResults").classList.remove("open")
    }

    const chooseFile = (e) => {
        setFile(e.target.files[0])
        chooseMessage.current.textContent = e.target.files[0].name
    }

    return (
        <div className="checkConcentration">

            <h2>Проверить вещество:</h2>

            <div className="checkConcentrationTools">
                <div className="inputFile">
                    <input
                        id="file"
                        type="file"
                        accept=".xls,.xlsx,"
                        onChange={e => chooseFile(e)}
                    />
                    <label ref={chooseMessage} htmlFor="file">Выбрать файл</label>
                </div>
                {file && response.length === 0 ? <button id="send" onClick={check}>Добавить</button> : <div></div>}
                {response.length > 0 ? <button id="delete" onClick={deleteNew}>Удалить</button> : <div></div>}
            </div>

            <div className="checkConcentrationResults">
                {response[0] === "Uncorrected" ?
                    <div>Неверный формат файла</div>
                    : response[0] === "Empty" ?
                        <div>Не содержит доступных простых веществ</div>
                        :
                            <div>
                                Содержит в себе следующие простые вещества:
                                {response.map(paragraph =>
                                    <p key={paragraph}>{paragraph}</p>
                                )}
                            </div>
                }
            </div>

        </div>
    );
};

export default CheckConcentration;