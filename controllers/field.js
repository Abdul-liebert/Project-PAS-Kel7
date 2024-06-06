const { generateToken } = require('../config/generateToken.js');
const mailer = require('../config/mailer.js')
const { comparePassword, hashPassword } = require('../config/bcrypt.js')
const {
    successRes,
    errorRes,
    validErr,
    notFoundRes,
    internalErrorRes
} = require('../config/response.js');
const { fields } = require('../db/tables/field.js');
const { senderEmail } = require('../db/tables/sender.js');

async function registerField(req, res) {
    const { name, email, phone, city, company } = req.body; 

    try {
        const existingUser = await fields.findOne({ where: { email } });
        if (existingUser) {

            return errorRes(res, 'Email already exists', 400);
        }


        const formField = await fields.create({
            name,
            email,
            phone,
            city,
            company
        });


        const confirmationMessage = `Hello ${formField.name}, Thank you for registering to this birthday company event`;

        const emailRecord =await senderEmail.create({
            fieldId: formField.id,
            message: confirmationMessage 
        });


        const formResponse = {
            id: formField.id,
            name: formField.name,
            email: formField.email,
            phone: formField.phone,
            city: formField.city,
            company: formField.company
        }
        const emailResponse = {

            fieldId:emailRecord.fieldId,
            message:emailRecord.message

        };

        // Kirim respons berhasil dan hentikan eksekusi
        return successRes(res, 'Register completed successfully and confirmation email sent', {formResponse, emailResponse} ,201);

        
    } catch (error) {
        // Tangani kesalahan dan kirim respons kesalahan
        return internalErrorRes(res, error);

        })

        if (!form) {
            return notFoundRes(res, "Form not created", 400)
        } else {
            return successRes(res, "Form succesfully created", form, 200)
        }
    } catch (error) {
        console.error(error)
        return internalErrorRes(res, "Internal server Error", error)

    }
};

async function confirmationEmail(res, req) {
    const { name, email } = req.body;
    try {
        const findFieldsEmail = await fields.findAll({ where: { name, email } })
        const findAdminEmail = await users.findOne({ where: { email } })

        if (!findAdminEmail) {
            return notFoundRes(res, 'Specified parameters not found')
        }
        if (!findFieldsEmail) {
            return notFoundRes(res, 'Specified parameters not found')
        }

        const registParams = {
            name: findFieldsEmail.name,
            email: findFieldsEmail.email,
            password: findFieldsEmail.password
        }

        const adminParams = {
            email: findAdminEmail.email
        }

        const information = {
            from: adminParams.email,
            to: registParams.email,
            subject: 'Konfirmasi Pendaftaran',
            message: `Halo ${registParams.name},\n\n Terima kasih sudah mendaftar, Kami tunggu kehadiran anda \n Salam,\n Panitia Acara`
        }

        const message = await mailer(information.to, registParams.name)

        return successRes(res, message)
    } catch (error) {
        console.error('error: ', error)
        return internalErrorRes(res, error)
    }
}


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
    const { id } = req.params;
    const { city, company } = req.body;

    try {
        const field = await fields.findOne({ where: { id } });
        if (!field) {
            return notFoundRes(res, 'Field not found', 404);
        }

        const updatedField = await fields.update({ city, company }, { where: { id } });

        if (updatedField[0] === 0) {
            return notFoundRes(res, 'Field not updated', 400);
        }

        const fieldResponse = {
            city: city,
            company: company,
        };

        return successRes(res, 'Field updated successfully', fieldResponse, 200);
    } catch (error) {
        console.error(error);
        return internalErrorRes(res, error, 500);
    }
}


async function deleteFields(req, res) {
    const id = req.params;

    try {
        const field = await fields.findOne({ where: { id } })
        if (!field) {
            return notFoundRes(res, 'field not found');
        } else {

            await field.destroy();
        }


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
    deleteFields,
    confirmationEmail
}