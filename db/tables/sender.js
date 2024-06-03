const {DataTypes} = require('sequelize');
const sequelize = require('../config');

const senderEmail = sequelize.define('sender',{
    id_user: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey: true
    },
    fieldId:{
        type: DataTypes.INTEGER,
        references:{
            model : 'field',
            key : 'id'
        },
        onDelete: 'CASCADE'
    },
    message:{
        type: DataTypes.TEXT,
        allowNull:false
    }
},
{
    tableName: 'senderemail',
    timestamps : false
})
module.exports = {senderEmail}