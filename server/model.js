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

element.hasMany(string)
string.belongsTo(element)

module.exports = {
    element,
    string
}