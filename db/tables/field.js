const { DataTypes } = require("sequelize");
const sequelize = require("../config");

const fields = sequelize.define('field', {
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
    tableName: 'field'
})

module.exports = fields;