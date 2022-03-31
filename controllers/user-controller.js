const User = require('../models/User')

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
    // api/users/:id
    getUserById(req, res) {
        User.findOne({ _id: req.params.id })
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id.' })
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    // POST a user (create a user)
    // api/users
    createUser(req, res) {
        User.create(req.body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    // PUT a user (update a user)
    // api/users/:id
    
};

module.exports = userController;