const express = require('express');
const router = express.Router();

const {
    register,
    login,
    get,
    logout
} = require('../controllers/user');
const authentication = require('../Middleware/authentication');

router.post('/register', register);
router.post('/login', login);
router.get('/get', authentication, get);
router.post('/logout', logout);


module.exports = router;