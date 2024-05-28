const express = require('express');
const router = express.Router();

const {
    getFields,
    getById,
    registerField,
    updateFields,
    deleteFields
} = require('../controllers/field');
const authentication = require('../Middleware/authentication');

router.get('', authentication, getFields);
router.get('/:id/show', authentication, getById);
router.post('/form', authentication, registerField);
router.patch('/:id/update', authentication, updateFields);
router.delete('/:id/delete', authentication, deleteFields);

module.exports = router;