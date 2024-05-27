const { generateToken } = require('../config/generateToken.js')
const { comparePassword, hashPassword } = require('../config/bcrypt.js')
const {
    successRes,
    errorRes,
    validErr,
    notFoundRes,
    internalErrorRes
} = require('../config/response.js');
const { fields } = require('../db/tables/field.js');

async function get(req, res) {
    try {
        const allFields = await fields.findAll();
        successRes(res, allFields, 200);
    } catch (error) {
        console.error('error: ', error);
        internalErrorRes(res, error);

    }
}

async function register(req, res) {
    const { name, email, phone, city, company } = req.body;
    try {
        const existingUser = await field.findOne({ where: { email } });
        if (existingUser) {
            errorRes(res, 'User already exists', 400)
        }

        const formField = await field.create({
            name,
            email,
            phone,
            city,
            company
        });

        const formResponse = {
            id: formField.id,
            name: formField.name,
            email: formField.email,
            phone: formField.phone,
            city: formField.city,
            company: formField.company,
            createdAt: formField.createdAt,
            updatedAt: formField.updateAt,
        };
        return successRes(res, 'Register completed succesfully', formResponse, 201)

    } catch (error) {
        return internalErrorRes(res, error)

    }
};

async function getField(req, res) {

}




// async function login(req, res) {
//     try {
//         const { email, password } = req.body;

//         const userlog = await user.findOne({ where: { email } })
//         if (!userlog) {
//             return notFoundRes(res, 'User not found')
//         }

//         const validPassword = await comparePassword(password, userlog.password);
//         if (!validPassword) {
//             return errorRes(res, 'invalid password', 401)
//         }

//         const userResponse = {
//             id: userlog.id,
//             name: userlog.username,
//             email: userlog.email
//         }

//         const token = generateToken(userlog);
//         return successRes(res, 'Logged in successfully', {
//             user: userResponse,
//             token
//         }, 200)
//     } catch (error) {
//         console.error('Error logging in user', error)
//         return internalErrorRes(res, error)
//     }
// };

// async function get(req, res) {
//     try {
//         const getUser = await user.findByPk(req.user.id, {
//             attributes: ['id', 'name', 'email']
//         });
//         if (!user) {
//             errorRes(res, 'user not found', 404)
//         }
//         successRes(res, 'user fetched succesfully', getUser, 200)
//     } catch (error) {
//         console.error('error fetching user', error)
//         internalErrorRes(res, error)
//     }
// };

// async function logout(req, res) {
//     try {
//         successRes(res, 'Logged out succesfully', null, 200)
//     } catch (error) {
//         console.error('Error logging out user:', error)
//         internalErrorRes(res, error)
//     }
// }

module.exports = {
    register,
    login,
    get,
    // logout
}