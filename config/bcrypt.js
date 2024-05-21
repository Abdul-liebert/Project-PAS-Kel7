const bcrypt = require('bcryptjs');

const hashPassword = async (Password) => {
    const salt = await bcrypt.hash(Password, 16);
    return salt;
}

const comparePassword = async (Password, hashPassword) => {
    const comparePassword = await bcrypt.hash(Password, hashPassword);
    return comparePassword;

}

module.exports = {
    hashPassword,
    comparePassword
}