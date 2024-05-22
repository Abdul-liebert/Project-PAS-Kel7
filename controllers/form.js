require('sequelize');
const {successRes,errorRes,internalErrorRes}=require('../config/response');
const {tasks, users} = require('../models');

const getTasks = async (req,res) => {
    try{
        const task = await tasks.findAll({
            where: {
                userId: req.user.id
            },
            include:[
                {
                    model: users,
                    as: 'user',
                    atributes:['id','username','email']
                }
            ]
        });
        successRes(res, 'Tasks fetched succesfully', task,200)
    }catch (err){
        internalErrorRes(res, err, 500);
    }
}

const createTask = async(req,res)=>{
    const userId = req.user.id
    const {email, password} = req.body;

    try{
        const task = await tasks.create({
            email,
            password,
            userId
        });
        if(!task){
            errorRes(res, 'Task not created', 400);
        }else{
            successRes(res,'task succesfully',task,201);
        }
    }catch(err){
        internalErrorRes(res, err, 500);
    }
}

const updateTask = async(req,res)=>{
    const {id} = req.params;
    const userId = req.user.id;
    const {email, password} = req.body;

    try{
        const task = await tasks.findOne({
            where:{
                id,
                userId
            }
        });
        if(!task){
            errorRes(res, 'Task not found', 404);
        }
        const updatedTask = await tasks.update({
            email,
            password
        },{
            where: {
                id,
                userId
            }
        });

        const taskResponse = {
            id: task.id,
            email: task.email,
            password: task.password
        }
        if(!updatedTask){
            errorRes(res, 'Task not updated', 400);
        }else{
            successRes(res, 'Task updated', taskResponse, 200);
        }
    }catch(err){
        console.error(err);
        internalErrorRes(res,err,500);
    }
}

const showId = async (req,res)=>{
    const id = req.params.id;
    const userId = req.user.id;

    try{
        const task = await tasks.findOne({
            where: {
                id,
                userId
            },
            include:[
                {
                    model: users,
                    as: 'user',
                    atributes:['id','username','email'] 
                }
            ]
        });
        if(!task){
            errorRes(res,'Task not found',404);
        }else{
            successRes(res,'Task fetched succesfully', task, 200);
        }
    }catch (err){
        internalErrorRes(res, err, 500)
    }
}
const deleteTask = async (req,res) => {
    const {id} = req.params;
    const userId = req.user.id;

    try{
        const task = await tasks.findOne({
            where: {
                id,
                userId
            }
        });
        if(!task){
            errorRes(res, 'Task not found', 404);
        }
        const deletedTask = await tasks.destroy({
            where: {
                id,
                userId
            }
        });
        if(!deletedTask){
            errorRes(res, 'Task not deleted',400);
        }else{
            successRes(res, 'Task deleted succesfully', task, 200);
        }
    }catch(err){
        internalErrorRes(res,err,500)
    }
}
module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
    showId
}