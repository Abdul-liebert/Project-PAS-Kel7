const { DataTypes } = require('sequelize');
const { sequelize } = require('.');

module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING,
        },
    }, {
        timestamps: true,
        createdAt: 'createdAt',
        updateAt: 'updateAt',
        tableName: 'user'
    })
    return user;
}