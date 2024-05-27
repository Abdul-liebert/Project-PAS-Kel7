// controllers/userController.js
const User = require('../db/tables/tasks');

exports.getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByPk(id);

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};
