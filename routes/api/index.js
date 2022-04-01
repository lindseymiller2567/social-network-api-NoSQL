const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes')

// add prefix of `/users` to routes created in `user-routes.js`
// localhost:3001/api/users
router.use('/users', userRoutes);

// add prefix of `/thoughts` to routes created in `thought-routes.js`
// localhost:3001/api/thoughts
router.use('/thoughts', thoughtRoutes);

module.exports = router;