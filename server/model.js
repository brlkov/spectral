const sequelize = require('./db')
const {DataTypes} = require('sequelize')

const element = sequelize.define('element', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    max: {type: DataTypes.JSON},
    file: {type: DataTypes.STRING}
})

const string = sequelize.define('string', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    ramanshift: {type: DataTypes.STRING, allowNull: false},
    count: {type: DataTypes.STRING, allowNull: false},
})

const substance = sequelize.define('substance', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    max: {type: DataTypes.INTEGER, allowNull: false},
})

const percentage = sequelize.define('percentage', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    value: {type: DataTypes.INTEGER, allowNull: false},
    percent: {type: DataTypes.STRING, allowNull: false},
})


element.hasMany(string)
string.belongsTo(element)

substance.hasMany(percentage)
percentage.belongsTo(substance)

module.exports = {
    element,
    string,

    substance,
    percentage
}