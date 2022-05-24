const router = require('express').Router();
const apiRoutes = require('./api');
const mainscreenRoutes = require('./mainscreen-routes');
const restaurantRoutes = require('./restaurant-routes');
const ordersearchRoutes = require('./ordersearch-routes');

router.use('/api', apiRoutes);
router.use('/', mainscreenRoutes);
router.use('/restaurant', restaurantRoutes);
router.use('/orderSearch', ordersearchRoutes);
module.exports = router;