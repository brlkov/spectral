import React, {useState, useRef} from 'react';
import axios from "axios";

const CreateElement = () => {
    const [name, setName] = useState('')
    const [file, setFile] = useState(null)
    const [max, setMax] = useState([])
    const chooseMessage = useRef()

    const createNew = async () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('file', file)
        await axios.post("http://localhost:4000/api/element", formData).then(res => setMax(res.data))
        document.querySelector(".newElementResults").classList.add("open")
    }

    const saveNew = async () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('max', JSON.stringify(max))
        formData.append('file', file)
        await axios.post("http://localhost:4000/api/save-element", formData).then(res => document.location.reload())
    }

    const deleteNew = () => {
        setName('')
        setFile(null)
        setMax([])
        chooseMessage.current.textContent = "Выбрать файл"
        document.querySelector(".newElementResults").classList.remove("open")
    }

    const chooseFile = (e) => {
        setFile(e.target.files[0])
        chooseMessage.current.textContent = e.target.files[0].name
    }

    return (
        <div className="newElement">

            <h2>Добавить новое вещество:</h2>

            <div className="newElementTools">
                <input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Название"
                />
                <div className="inputFile">
                    <input
                        id="file"
                        type="file"
                        accept=".xls,.xlsx,"
                        onChange={e => chooseFile(e)}
                    />
                    <label ref={chooseMessage} htmlFor="file">Выбрать файл</label>
                </div>
                {name && file && max.length === 0 ? <button id="add" onClick={createNew}>Добавить</button> : <div></div>}
                {max.length > 0 ? <button id="delete" onClick={deleteNew}>Удалить</button> : <div></div>}
                {name && file && max.length > 1 ? <button id="save" onClick={saveNew}>Сохранить</button> : <div></div>}
            </div>

            <div className="newElementResults">
                {max[0] === "Uncorrected" ? <div>Неверный формат файла</div> : max[0] === "Exists" ? <div>Элемент с таким названием уже существует</div> : <div>Пик(длина волны): {max.map(element => <div key={element.id}>{element.max}({element.id * 2 + 400})</div>)}</div>}
            </div>

        </div>
    );
};

export default CreateElement;