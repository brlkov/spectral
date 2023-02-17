const path = require('path')
const fs = require('fs')
const {element, string} = require('./model');
const xlsx = require('xlsx');

class controller {

    async create(req, res) {
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


    async save(req, res) {
        const {name, max} = req.body
        const {file} = req.files
        console.log(max)

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


    async delete(req, res) {
        const {id, name} = req.body
        const elementId = id

        let deleteStrings = await string.findAll({where: {elementId}})
        for (let i = 0; i < deleteStrings.length; i++) {
            await deleteStrings[i].destroy()
        }

        let deleteElement = await element.findOne({where: id})
        await deleteElement.destroy()

        fs.unlink(`./static/${name}.xls`, err => {})

        const elements = await element.findAll()
        return res.json(elements)
    }


    async getAll(req, res) {
        const elements = await element.findAll()
        return res.json(elements)
    }

}

module.exports = new controller()
