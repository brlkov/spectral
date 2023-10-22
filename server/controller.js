const path = require('path')
const fs = require('fs')
const {element, string, substance, percentage} = require('./model');
const xlsx = require('xlsx');
const {max} = require("pg/lib/defaults");

class controller {

    async element(req, res) {
        const {name} = req.body
        const {file} = req.files
        let max = []

        if (await element.findOne({where: {name}})) return res.json(["Exists"])

        file.mv(path.resolve(__dirname, 'static', `${name}.xls`)).then(e => {

            const excelData = xlsx.readFile(`./static/${name}.xls`)

            let parse = Object.keys(excelData.Sheets).map(name => ({
                name,
                data: xlsx.utils.sheet_to_json(excelData.Sheets[name])
            }))

            parse = parse[0].data

            if (parse[0].__EMPTY === 'Counts') {
                for (let i = 2; i < parse.length; i++) {
                    if (parse[i].__EMPTY > parse[i-1].__EMPTY && parse[i].__EMPTY > parse[i+1].__EMPTY) {
                        max.push({id: parse[i]['Date/time'], max: parse[i].__EMPTY})
                    }
                }
                fs.unlink(`./static/${name}.xls`, err => {})
                return res.json(max)
            } else {
                return res.json(["Uncorrected"])
            }

        })
    }


    async saveElement(req, res) {
        const {name, max} = req.body
        const {file} = req.files

        await element.create({name, max, file: `${name}.xls`})
        const elem = await element.findOne({where: {name}})

        file.mv(path.resolve(__dirname, 'static', `${name}.xls`)).then(async e => {

            const excelData = xlsx.readFile(`./static/${name}.xls`)

            let parse = Object.keys(excelData.Sheets).map(name => ({
                name,
                data: xlsx.utils.sheet_to_json(excelData.Sheets[name])
            }))

            parse = parse[0].data

            for (let i = 1; i < parse.length; i++) {
                await string.create({ramanshift: parse[i]['Date/time'] * 2 + 400, count: parse[i].__EMPTY, elementId: elem.id})
            }
        })

        const elements = await element.findAll()
        return res.json(elements)
    }


    async deleteElement(req, res) {
        const {id, name} = req.body
        const elementId = id

        let deleteStrings = await string.findAll({where: {elementId}})
        for (let i = 0; i < deleteStrings.length; i++) {
            await deleteStrings[i].destroy()
        }

        let delElement = await element.findOne({where: id})
        await delElement.destroy()

        fs.unlink(`./static/${name}.xls`, err => {})

        const elements = await element.findAll()
        return res.json(elements)
    }


    async getAllElements(req, res) {
        const elements = await element.findAll()
        return res.json(elements)
    }




    async check(req, res) {
        const {file} = req.files
        let maxes = []
        let substances = await substance.findAll()
        let percentages = await percentage.findAll()
        let responseString = []

        file.mv(path.resolve(__dirname, 'static', `checkSubstanceFile.xls`)).then(e => {
            const excelData = xlsx.readFile(`./static/checkSubstanceFile.xls`)
            let parse = Object.keys(excelData.Sheets).map(name => ({
                name,
                data: xlsx.utils.sheet_to_json(excelData.Sheets[name])
            }))
            parse = parse[0].data
            if (parse[0].__EMPTY === 'Counts') {
                for (let i = 2; i < parse.length; i++) {
                    if (parse[i].__EMPTY > parse[i-1].__EMPTY && parse[i].__EMPTY > parse[i+1].__EMPTY) {
                        maxes.push({max: parse[i]['Date/time'] * 2 + 400, value: parse[i].__EMPTY})
                    }
                }
                fs.unlink(`./static/checkSubstanceFile.xls`, err => {})
            } else {
                responseString.push("Uncorrected")
            }
        }).then(() => {
            if (responseString[0] !== "Uncorrected") {
                for (let i = 0; i < substances.length; i++) {
                    for (let j = 0; j < maxes.length; j++) {
                        let paragraph = ""
                        if (substances[i].max === maxes[j].max) {
                            paragraph = substances[i].name
                            for (let k = 0; k < percentages.length; k++) {
                                if (maxes[j].value < percentages[k].value + 2 && maxes[j].value > percentages[k].value - 2 && substances[i].id === percentages[k].substanceId) {
                                    paragraph += ` (концентрация ${percentages[k].percent}%)`
                                }
                            }
                        }
                        if (paragraph) responseString.push(paragraph)
                    }
                }
            }
        }).then(() => {
            if (responseString.length === 0)
            {
                responseString.push("Empty")
            }
            return res.json(responseString)
        })
    }


    async substance(req, res) {
        const {name, max, concentrations} = req.body
        const conc = JSON.parse(concentrations)

        await substance.create({name, max})

        const subs = await substance.findOne({where: {name}})

        for (let i = 0; i < conc.length; i++) {
            await percentage.create({value: conc[i].value, percent: conc[i].percentage, substanceId: subs.id})
        }

        let substances = await substance.findAll()
        let percentages = await percentage.findAll()
        substances = [...substances, {id: "percentages", items: percentages}]
        return res.json(substances)
    }


    async deleteSubstance(req, res) {
        const {id, name} = req.body
        const substanceId = id

        let delPercentages = await percentage.findAll({where: {substanceId}})
        for (let i = 0; i < delPercentages.length; i++) {
            await delPercentages[i].destroy()
        }

        let delSubstance = await substance.findOne({where: id})
        await delSubstance.destroy()

        let substances = await substance.findAll()
        return res.json(substances)
    }


    async getAllSubstances(req, res) {
        let substances = await substance.findAll()
        let percentages = await percentage.findAll()
        substances = [...substances, {id: "percentages", items: percentages}]
        return res.json(substances)
    }
}

module.exports = new controller()

