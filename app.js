
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');



var indexRouter = require('./routes/index');
var tasksRouter = require('./routes/tasks');
var userRouter = require('./routes/user');
require('dotenv').config();



const app = express();

app.use(cors())

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', userRouter);
app.use('/tasks', tasksRouter)

module.exports = app;