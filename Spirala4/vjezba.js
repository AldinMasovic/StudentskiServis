var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    var Vjezba = sequelize.define('vjezba', {
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
        spirala: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        }
    }, {
        freezeTableName: true,
        tableName: 'vjezba'
    });
    return Vjezba;
}