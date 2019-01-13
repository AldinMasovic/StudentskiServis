var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    var Zadatak = sequelize.define('zadatak', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        naziv: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        postavka: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    }, {
        freezeTableName: true,
        tableName: 'zadatak'
    });
    return Zadatak;
}