var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var fieldRouter = require('./routes/field');
var usersRouter = require('./routes/user');
require('dotenv').config();



const app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/index', indexRouter)
app.use('/register', usersRouter)
app.use('/register/field', fieldRouter)


module.exports = app;