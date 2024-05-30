const users = require('../db/tables/user.js')
const { generateToken } = require('../config/generateToken.js')
const { comparePassword, hashPassword } = require('../config/bcrypt.js')
const {
    successRes,
    errorRes,
    validErr,
    notFoundRes,
    internalErrorRes
} = require('../config/response')

async function register(req, res) {
    const { name, email, password } = req.body;
    try {
        const existingUser = await users.findOne({ where: { email } });
        if (existingUser) {
            errorRes(res, 'User already exists', 400)
        }

        const hashedPassword = await hashPassword(password)

        const newUser = await users.create({
            name,
            email,
            password: hashedPassword
        });

        const userResponse = {
            id: newUser.id,
            name: newUser.name,
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
        const user = await users.findOne({ where: { email } })
        if (!user) {
            notFoundRes(res, 'User not found')
        }

        const validPassword = await comparePassword(password, user.password);
        if (!validPassword) {
            errorRes(res, 'invalid password', 401)
        }

        const userResponse = {
            id: user.id,
            username: user.username,
            email: user.email
        }

        const token = generateToken(user);
        successRes(res, 'Logged in successfully', {
            user: userResponse,
            token
        }, 200)

    } catch (error) {
        console.error('Error logging in user', error)
        internalErrorRes(res, error)
    }
};

async function get(req, res) {
    try {
        const getUser = await users.findByPk(req.user.id, {
            attributes: ['id', 'name', 'email']
        });
        if (!getUser) {
            errorRes(res, 'user not found', 404)
        }
        successRes(res, 'user fetched succesfully', getUser, 200)
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