const { User } = require('../models');

const userController = {
    // GET all users
    // api/users
    getAllUsers(req, res) {
        User.find({})
            // .populate({
            //     path: 'friends',
            //     select: '-__v'
            // })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            });
    },

    // GET one user
    // api/user/:id

    // POST a user (create a user)
    // api/user
    createUser(req, res) {
        User.create(req.body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    }
};

module.exports = userController;