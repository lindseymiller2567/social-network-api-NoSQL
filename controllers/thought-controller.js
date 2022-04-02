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

    // GET one thought by ID
    // api/thoughts/:id
    getThoughtById(req, res) {
        Thought.findOne({ _id: req.params.id })
            .select('-__v')
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id.' })
                    return;
                }
                res.json(dbThoughtData)
            })
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

    },

    // PUT a thought (update a thought)
    // api/thoughts/:id
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            req.body, // { $push: req.body },
            { new: true, runValidators: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id.' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },

    // DELETE a thought 
    // api/thoughts/:id
    deleteThought(req, res) {
        Thought.findOneAndDelete(
            { _id: req.params.id }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    return res.status(404).json({ message: 'No thought found with this id.' });
                }
                return User.findOneAndUpdate(
                    { thoughts: req.params.id },
                    { $pull: { thoughts: req.params.id } },
                    { new: true }
                )
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id.' });
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => res.status(400).json(err));
    },

    // POST a reaction (create a reaction)
    // api/thoughts/:thoughtId/reactions
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id.' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err)
                res.json(err)
            });
    },

    // DELETE a reaction 
    // api/thoughts/:thoughtId/:reactionId
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { _id: req.params.reactionId } } },
            { new: true }
        )
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    }
};

module.exports = thoughtController;