import React, {useRef, useState} from 'react';
import axios from "axios";
import jsPDF from 'jspdf'
import '../fonts/TimesNewRoman-normal.js'

const CheckConcentration = () => {
    const [file, setFile] = useState(null)
    const [response, setResponse] = useState([])
    const chooseMessage = useRef()

    const check = async () => {
        const formData = new FormData()
        formData.append('file', file)
        await axios.post("http://89.108.77.219:4000/api/check", formData).then(res => {
            setResponse(res.data)
        })
        document.querySelector(".checkConcentrationResults").classList.add("open")
    }

    const substanceReportGenerate = () => {
        let doc = new jsPDF('portrait', 'px', 'a4')
        doc.addFont("TimesNewRoman-normal.ttf", "TimesNewRoman", "normal");
        doc.setFont('TimesNewRoman');
        doc.setFontSize(14);
        doc.text("Отчет о наличии примесей в составе вещества", 40, 40)
        let date = new Date()
        let time = date.toLocaleString()
        doc.text(time, 40, 60)
        doc.text(`В выбранном веществе обнаружено ${response.length} примесей:`, 40, 100)
        let y = 100
        response.map(paragraph => {
            y = y + 20
            doc.text(paragraph.split(`(`)[0], 40, y)
        })
        doc.save('Отчет о наличии примесей')
    }

    const concentrationReportGenerate = () => {
        let doc = new jsPDF('portrait', 'px', 'a4')
        doc.addFont("TimesNewRoman-normal.ttf", "TimesNewRoman", "normal");
        doc.setFont('TimesNewRoman');
        doc.setFontSize(14);
        doc.text("Отчет о процентном содержании содержащихся в веществе примесей", 40, 40)
        let date = new Date()
        let time = date.toLocaleString()
        doc.text(time, 40, 60)
        doc.text(`В выбранном веществе обнаружены следующие примеси и их процентное содержание:`, 40, 100)
        let y = 100
        response.map(paragraph => {
            y = y + 20
            doc.text(paragraph, 40, y)
        })
        doc.save('Отчет о процентном содержании примесей')
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
                                <div className="reportButtons">
                                    <button
                                        onClick={substanceReportGenerate}
                                        className="reportButton"
                                    >
                                        Скачать отчет о наличии примесей
                                    </button>
                                    <button
                                        onClick={concentrationReportGenerate}
                                        className="reportButton"
                                    >
                                        Скачать отчет о процентном содержании примесей
                                    </button>
                                </div>
                            </div>
                }
            </div>

        </div>
    );
};

export default CheckConcentration;