var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    var Godina = sequelize.define('godina', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        naziv: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        nazivRepSpi: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        nazivRepVje: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    }, {
        freezeTableName: true,
        tableName: 'godina'
    });
    return Godina;
}