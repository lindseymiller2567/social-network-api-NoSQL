const router = require('express').Router();
const {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser
} = require('../../controllers/user-controller');

// localhost:3001/api/users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

// localhost:3001/api/users/id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;