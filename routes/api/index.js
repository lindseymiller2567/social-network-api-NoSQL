const router = require('express').Router();
const userRoutes = require('./user-routes');

// add prefix of `/users` to routes created in `user-routes.js`
// http://localhost:3001/api/users
router.use('/users', userRoutes);


module.exports = router;