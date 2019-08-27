var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
    var student = sequelize.define('student', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        imePrezime: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        index: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        freezeTableName: true,
        tableName: 'student'
    });
    return student;
}