const Thought = require('../models/Thought');
const User = require('../models/User');

const thoughtController = {
    // GET all thoughts
    // api/thoughts
    getAllThoughts(req, res) {
        Thought.find()
            .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err)
                res.status(404).json(err)
            });
    },

    // POST a thought (create a thought)
    // api/thoughts
    createThought(req, res) {
        // console.log(req.body)
        Thought.create(req.body)
            .then(({ _id }) => {
                console.log("New thought with ID of: " + _id)
                return User.findOneAndUpdate(
                    { _id: req.body.userId }, // where
                    { $push: { thoughts: _id } }, // what we want to udpate
                    { new: true, runValidators: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id.' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err)
                res.json(err)
            });

    }
};

module.exports = thoughtController;