const Thought = require('../models/Thought');
const User = require('../models/User');

const userController = {
    // GET all users
    // api/users
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'friends',
                select: '-__v'
            })
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
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
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
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true, runValidators: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id.' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(500).json(err));
    },

    // DELETE a user 
    // api/users/:id
    deleteUser(req, res) {
        User.findOneAndDelete(
            { _id: req.params.id }
        )
            .then(dbUserData => {
                // console.log(dbUserData)
                if (!dbUserData) {
                    return res.status(404).json({ message: 'No user with this id.' })
                }
                // delete user's associated thoughts
                // delete where the _id field in Thought matches any one of the values inside the array of dbUserData.thoughts
                // Mongoose $in operator is useful when you want to find records where one property is a set of values, and not just one value
                return Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
            })
            .then(() => {
                res.json({ message: 'User and associated thoughts deleted.' });
            })
            .catch(err => res.status(500).json(err));
    },

    // POST a new friend to user's friend list 
    // api/users/:userId/friends/:friendId
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id.' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(500).json(err));
    },

    // DELETE a friend from user's friends list
    // api/users/:userId/friends/:friendId
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id.' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(500).json(err));
    }
};

module.exports = userController; 