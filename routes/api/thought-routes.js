const router = require('express').Router();
const { getAllThoughts, createThought, createReaction } = require('../../controllers/thought-controller')

// localhost:3001/api/thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

router
    .route('/:thoughtId/reactions')
    .post(createReaction);
//.delete

module.exports = router;