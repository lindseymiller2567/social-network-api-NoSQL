const router = require('express').Router();
const { getAllThoughts, createThought } = require('../../controllers/thought-controller')

// localhost:3001/api/thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

module.exports = router;