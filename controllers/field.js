const { generateToken } = require('../config/generateToken.js')
const { comparePassword, hashPassword } = require('../config/bcrypt.js')
const {
    successRes,
    errorRes,
    validErr,
    notFoundRes,
    internalErrorRes
} = require('../config/response.js');
const { fields,senderEmail } = require('../db/tables/field.js');
console.log(fields)

async function registerField(req, res) {

    const { name, email, phone, city, company } = req.body; 
    try {
        const existingUser = await fields.findOne({ where: { email } });
        if (existingUser) {
            errorRes(res, 'User already exists', 400)
        }

        const formField = await fields.create({
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
            // createdAt: formField.createdAt,
            // updatedAt: formField.updateAt,
        };

        const confirmationMessage = `Hello ${name},\n\nThank you for registering to this birthday company event`;

        await senderEmail.create({
            fieldId : formField.id,
            message : confirmationMessage 
        });

  
        return successRes(res, 'Register completed succesfully and confirmation email sent', formResponse, 201)

    } catch (error) {
        return internalErrorRes(res, error)

    }
};


async function getFields(req, res) {
    try {
        const allFields = await fields.findAll();
        return successRes(res, allFields, 200);
    } catch (error) {
        console.error('error: ', error);
        return internalErrorRes(res, error);

    }
}

async function getById(req, res) {
    try {
        const { id } = req.params
        const fieldsId = req.params.id;
        const field = await fields.findByPk(fieldsId);

        if (!field) {
            return notFoundRes(res, 'fields Not found')
        }

        return successRes(res, field, 200);
    } catch (error) {
        console.error('error: ', error);
        internalErrorRes(res, error);

    }
}


async function updateFields(req, res) {
    const { id } = req.params
    const fieldsId = req.params.id;
    const { city, company } = req.body;

    try {
        const field = await fields.update({
            city,
            company
        }, {
            where: {
                id,
                fieldsId
            }
        });

        if (!field) {
            notFoundRes(res, 'field not found ')
        }

        const updatedField = await fields.update({ city, company }, { where: { id, fieldsId } });

        const fieldResponse = {
            id: field.id,
            city: field.city,
            company: field.company,
        }

        if (!updatedField) {
            notFoundRes(res, 'field not updated', 400)
        } else {
            successRes(res, 'field updated succesfully', fieldResponse, 200)
        }
    } catch (error) {
        console.error(error);
        internalErrorRes(res, error, 500)
    }
}

async function deleteFields(req, res) {
    const id = req.params;

    try {
        const field = await fields.findOne({ where: { id } })
        if (!field) {
            return notFoundRes(res, 'field not found');
        }

        await field.destroy();

        return successRes(res, 'Field succesfully deleted', null, 200)
    } catch (error) {
        console.error(error);
        return internalErrorRes(res, error, 500)

    }
}


module.exports = {
    getFields,
    getById,
    registerField,
    updateFields,
    deleteFields
}