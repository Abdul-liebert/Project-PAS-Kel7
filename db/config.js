const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('reg_event', 'root','', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize