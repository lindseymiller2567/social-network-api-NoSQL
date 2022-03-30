const router = require('express').Router();
const apiRoutes = require('./api');

// http://localhost:3001/api/
router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).send('404 Error!')
});

module.exports = router;