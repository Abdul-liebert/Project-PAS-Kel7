
const { DataTypes } = require('sequelize');
const sequelize = require('../config');

    const tasks = sequelize.define('tasks',{
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:'user',
                key: 'id'
            }
        },
        name:{
            type: DataTypes.STRING,
            allowNull : false,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone:{
            type: DataTypes.INTEGER,
            allowNull: false,
            validate:{
                len:[0,12]
            }
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        company: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        confirm:{
            type: DataTypes.STRING,
            allowNull: false,
        }
        
    },{
        tableName:'tasks',
    });
    tasks.associate = (models)=>{
        tasks.belongsTo(models.user,{
            forignkey: ''
        });
    }
    return tasks;
