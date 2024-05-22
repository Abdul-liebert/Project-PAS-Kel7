const { user } = require('../models/user.js')

const generateToken = require('../config/generateToken.js')
const { comparePassword, hashPassword } = require('../config/bcrypt.js')
const {
    successRes,
    errorRes,
    validErr,
    notFoundRes,
    internalErrorRes
} = require('../config/response')

async function register(req, res) {
    const { username, email, password } = req.body;
    try {
        const existingUser = await user.findOne({ where: { email } });
        if (existingUser) {
            errorRes(res, 'User already exists', 400)
        }

        const hashedPassword = await hashPassword(password)

        const newUser = await user.create({
            username,
            email,
            password: hashedPassword
        });

        const userResponse = {
            id: newUser.id,
            name: newUser.username,
            email: newUser.email,
            createdAt: newUser.createdAt,
            updateAt: newUser.updateAt,
        };
        successRes(res, 'Register completed succesfully', userResponse, 201)

    } catch (error) {
        internalErrorRes(res, error)
    }
};


async function login(req, res) {
    try {
        const { email, password } = req.body;
        const userlog = await user.findOne({ where: { email } })
        if (!userlog) {
            notFoundRes(res, 'User not found')
        }

        const validPassword = await comparePassword(password, user.password);
        if (!validPassword) {
            errorRes(res, 'invalid password', 401)
        }

        const userResponse = {
            id: number,
            username: user.username,
            email: user.email
        }

        const token = generateToken(user);
        successRes(res, 'Logged in successfully', {
            user: userResponse,
            token
        }, 200)
    } catch (error) {
        console.error('Error logging in user', user)
        internalErrorRes(res, error)
    }
};

async function get(req, res) {
    try {
        const getUser = await user.findByPk(req.user.id, {
            attributes: ['id', 'username', 'email']
        });
        if (!user) {
            errorRes(res, 'user not found', 404)
        }
        successRes(res, 'user fetched succesfully', user, 200)
    } catch (error) {
        console.error('error fetching user', error)
        internalErrorRes(res, error)
    }
};

async function logout(req, res) {
    try {
        successRes(res, 'Logged out succesfully', null, 200)
    } catch (error) {
        console.error('Error logging out user:', error)
        internalErrorRes(res, error)
    }
}

module.exports = {
    register,
    login,
    get,
    logout
}