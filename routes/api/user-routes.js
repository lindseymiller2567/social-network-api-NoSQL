const router = require('express').Router();
const { getAllUsers, createUser } = require('../../controllers/user-controller');

// http://localhost:3001/api/users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

module.exports = router;