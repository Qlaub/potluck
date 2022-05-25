const router = require('express').Router();
const apiRoutes = require('./api');
const mainscreenRoutes = require('./mainscreen-routes');
const restaurantRoutes = require('./restaurant-routes');
const ordersearchRoutes = require('./ordersearch-routes');
const orderRoutes = require('./order-routes')
const menuRoutes = require('./menu-routes');

router.use('/api', apiRoutes);
router.use('/', mainscreenRoutes);
router.use('/restaurant', restaurantRoutes);
router.use('/orderSearch', ordersearchRoutes);
router.use('/order', orderRoutes);
router.use('/menu', menuRoutes);

module.exports = router;