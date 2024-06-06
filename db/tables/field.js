// models/user.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config'); // Pastikan Anda telah mengatur koneksi database


const fields = sequelize.define('field', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [0, 12]
        }
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    company: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'field',
    timestamps: false
});

const {senderEmail} =  require('../tables/sender')

fields.hasOne(senderEmail,{
    foreignKey: 'fieldId',
    as: 'confirmationEmail'
});
senderEmail.belongsTo(fields,{
    foreignKey : 'fieldId',
    as: 'user'
});

module.exports = {fields};



