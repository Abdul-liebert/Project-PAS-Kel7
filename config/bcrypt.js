const bcrypt = require('bcryptjs');

const hashPassword = (password) => {
    return bcrypt.hash(password, 8)
}

const comparePassword = (password, hashPassword) => {
    return bcrypt.compare(password, hashPassword)
}

module.exports = {
    hashPassword,
    comparePassword
}