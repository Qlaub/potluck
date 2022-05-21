const router = require('express').Router();
const donorRoutes = require('./donor-routes');

router.use('/donors', donorRoutes);

module.exports = router;