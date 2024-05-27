// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user1');

router.get('/user/:id', userController.getUserById);

module.exports = router;
